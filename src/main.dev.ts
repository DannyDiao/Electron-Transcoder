/* eslint global-require: off, no-console: off */

/**
 * This module executes inside of electron's main process. You can start
 * electron renderer process from here and communicate with the other processes
 * through IPC.
 *
 * When running `yarn build` or `yarn build:main`, this file is compiled to
 * `./src/main.prod.js` using webpack. This gives us some performance wins.
 */
import 'core-js/stable';
import 'regenerator-runtime/runtime';
import path from 'path';
import { app, BrowserWindow, shell } from 'electron';
import { autoUpdater } from 'electron-updater';
import log from 'electron-log';
import MenuBuilder from './menu';

const { dialog } = require('electron');
const ipcMain = require('electron').ipcMain;
let ffmpeg = require('fluent-ffmpeg');

let fileSrc = '';

export default class AppUpdater {
  constructor() {
    log.transports.file.level = 'info';
    autoUpdater.logger = log;
    autoUpdater.checkForUpdatesAndNotify();
  }
}

let mainWindow: BrowserWindow | null = null;

if (process.env.NODE_ENV === 'production') {
  const sourceMapSupport = require('source-map-support');
  sourceMapSupport.install();
}

if (
  process.env.NODE_ENV === 'development' ||
  process.env.DEBUG_PROD === 'true'
) {
  require('electron-debug')();
}

const installExtensions = async () => {
  const installer = require('electron-devtools-installer');
  const forceDownload = !!process.env.UPGRADE_EXTENSIONS;
  const extensions = ['REACT_DEVELOPER_TOOLS'];

  return installer
    .default(
      extensions.map((name) => installer[name]),
      forceDownload
    )
    .catch(console.log);
};

const createWindow = async () => {
  if (
    process.env.NODE_ENV === 'development' ||
    process.env.DEBUG_PROD === 'true'
  ) {
    await installExtensions();
  }

  const RESOURCES_PATH = app.isPackaged
    ? path.join(process.resourcesPath, 'assets')
    : path.join(__dirname, '../assets');

  const getAssetPath = (...paths: string[]): string => {
    return path.join(RESOURCES_PATH, ...paths);
  };

  mainWindow = new BrowserWindow({
    show: false,
    width: 1000,
    height: 720,
    icon: getAssetPath('icon.png'),
    webPreferences: {
      nodeIntegration: true
    }
  });

  mainWindow.loadURL(`file://${__dirname}/index.html`);

  // @TODO: Use 'ready-to-show' event
  //        https://github.com/electron/electron/blob/master/docs/api/browser-window.md#using-ready-to-show-event
  mainWindow.webContents.on('did-finish-load', () => {
    if (!mainWindow) {
      throw new Error('"mainWindow" is not defined');
    }
    if (process.env.START_MINIMIZED) {
      mainWindow.minimize();
    } else {
      mainWindow.show();
      mainWindow.focus();
    }
  });

  mainWindow.on('closed', () => {
    mainWindow = null;
  });

  const menuBuilder = new MenuBuilder(mainWindow);
  menuBuilder.buildMenu();

  // Open urls in the user's browser
  mainWindow.webContents.on('new-window', (event, url) => {
    event.preventDefault();
    shell.openExternal(url);
  });

  // Remove this if your app does not use auto updates
  // eslint-disable-next-line
  new AppUpdater();
};

/**
 * Add event listeners...
 */

app.on('window-all-closed', () => {
  // Respect the OSX convention of having the application in memory even
  // after all windows have been closed
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app.whenReady().then(createWindow).catch(console.log);

app.on('activate', () => {
  // On macOS it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  if (mainWindow === null) createWindow();
});

let metaData = {};
let outputDir = '';
//选择输出目录
ipcMain.on('save-path-selector', function(event, args) {
  const file_path = dialog.showOpenDialogSync({
    title: '选择输出文件路径',
    // 默认打开的路径，比如这里默认打开下载文件夹
    defaultPath: app.getPath('downloads'),
    buttonLabel: 'OK',
    // 限制能够选择的文件类型
    filters: [
      // { name: 'Images', extensions: ['jpg', 'png', 'gif'] },
      { name: 'Movies', extensions: ['mkv', 'avi', 'mp4', 'mov', 'flv'] }
      // { name: 'Custom File Type', extensions: ['as'] },
      // { name: 'All Files', extensions: ['*'] },
    ],
    properties: ['openDirectory', 'showHiddenFiles', 'createDirectory'],
    message: '选择输出文件路径'
  });

  event.sender.send('save-path-selector-reply', file_path);
  outputDir = file_path;
});

//选择本地文件
ipcMain.on('open-file-selector', function(event, args) {
  const file_path = dialog.showOpenDialogSync({
    title: '选择转码源文件',
    // 默认打开的路径，比如这里默认打开下载文件夹
    defaultPath: app.getPath('downloads'),
    buttonLabel: 'OK',
    // 限制能够选择的文件类型
    filters: [
      // { name: 'Images', extensions: ['jpg', 'png', 'gif'] },
      { name: 'Movies', extensions: ['mkv', 'avi', 'mp4', 'mov', 'flv'] }
      // { name: 'Custom File Type', extensions: ['as'] },
      // { name: 'All Files', extensions: ['*'] },
    ],
    properties: ['openFile', 'showHiddenFiles'],
    message: '选择转码源文件'
  });

  //将文件路径赋值
  fileSrc = file_path[0];

  //发送文件元信息回Render
  try {
    ffmpeg.ffprobe(file_path[0], function(err, metadata) {
      metaData = metadata;
      event.sender.send('open-file-selector-metadata-reply', metadata);
    });
  } catch (e) {
    console.log(e);
  }

  let fileName = 'cover' + (new Date().getTime()) + '.png';

  //截取视频封面并返回Render
  ffmpeg(file_path[0])
    .on('end', function() {
      event.sender.send('open-file-selector-cover-reply', path.join(__dirname, '/img/' + fileName));
    })
    .screenshots({
      folder: path.join(__dirname, '/img/'),
      count: 1,
      filename: fileName,
      size: '150x150'
    });
});

let params = {};
let tasks:Task[] = [];
let currentFFmpegProcess;

//接收所有转码参数
ipcMain.on('transcode-params', function(event, args) {
  params = args;
  currentFFmpegProcess = new ffmpeg(fileSrc);
  processFfmpegParams(currentFFmpegProcess, params);
  currentFFmpegProcess
    .on('progress', function(progress) {
      console.log('Processing: ' + progress.percent + '% done');
    })
    // .save((outputDir && params.file_name) ?
    //   (outputDir + '/' + params.file_name + '.' + params.format.toLowerCase()) :
    //   ('/' + params.file_name + '.' + params.format.toLowerCase()));



});

function processFfmpegParams(ffmpegProcess, params) {
  if (params.format) {
    ffmpegProcess.format(params.format.toLowerCase());
  }
  // if (params.fps) {
  //   ffmpegProcess.fps(parseFloat(params.fps));
  // }
  if (params.only_sound) {
    ffmpegProcess.noVideo();
  }
  if (params.only_video) {
    ffmpegProcess.noAudio();
  }
  if (params.quality) {
    if (params.quality !== 10) {
      let bitRate = metaData.format.bit_rate;
      bitRate = bitRate / params.quality;
      ffmpegProcess.videoBitrate(bitRate);
    }
  }
}

ipcMain.on('add-task', function(event, args) {
  if (!tasks.find(item => item.id === args.id)) {
    tasks.push({
      id: args.id,
      name: args.name,
      ffmpeg: currentFFmpegProcess,
      output: (outputDir && params.file_name) ?
        (outputDir + '/' + params.file_name + '.' + params.format.toLowerCase()) :
        ('/' + params.file_name + '.' + params.format.toLowerCase())
    })
  }
  console.log('tasks', tasks);
});

//开始转码
ipcMain.on('start-transcode', function(event, args) {
  let transcodeTask = tasks.find(item => item.id === args);
  if (transcodeTask) {
    transcodeTask.ffmpeg
      .on('progress', function(progress) {
        event.sender.send('transcode-progress', { id: args, progress: progress.percent.toFixed(2)});
        console.log('Processing: ' + progress.percent + '% done');
      })
      .on('end',function(stdout, stderr) {
        event.sender.send('transcode-end', { id: args, isEnd: true, outputDir: outputDir});
    })
      .save(transcodeTask.output)

  }
});

interface Task {
  id: number,
  name: string,
  ffmpeg: any,
  output: string
}
