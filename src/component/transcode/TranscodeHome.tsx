import React from 'react';
import { Button, Card, createStyles, Step, StepLabel, Stepper} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { useDispatch, useSelector } from 'react-redux';
import { ActionType } from '../../model/Interface';
import SelectSource from './SelectSource';
import SelectParams from './SelectParams';
import CheckParams from './CheckParams';
import path from 'path';

const useStyles = makeStyles(() =>
  createStyles({
    root: {
      flexDirection: 'column',
    },
    step_card: {
      width: 750,
      marginTop: -40
    },
    content_card:{
      width: 750,
      height: 480,
      marginTop: 20
    }
  }),
);


export default function TranscodeHome() {
  const classes = useStyles();
  const steps = ['选择源文件', '设置参数', '核对参数&开始'];
  const state = useSelector(state => state)
  const dispatch = useDispatch();

  let activeStep = 0;
  if (state && state.transcode && state.transcode.current_step) {
    activeStep = state.transcode.current_step;
  }

  function changeStepDispatch(index: number) {
    return dispatch({
      type: ActionType.ChangeTranscodeStep,
      payload: index
    })
  }

  //根据step渲染不同的content
  let cardContent;
  switch (activeStep) {
    case 0:
      cardContent = <SelectSource/>
      break;
    case 1:
      cardContent = <SelectParams/>;
      break;
    case 2:
      cardContent = <CheckParams/>;
      break;
  }


  return (
    <div className={classes.root}>
      <Card className={classes.step_card}>
        <Stepper activeStep={activeStep}>
          {steps.map((label) => {
            return (
              <Step key={label}>
                <StepLabel>{label}</StepLabel>
              </Step>
            );
          })}
        </Stepper>
      </Card>
      <Card className={classes.content_card}>
        {cardContent}
      </Card>
    </div>
  );

}
