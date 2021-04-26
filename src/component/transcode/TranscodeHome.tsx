import React, { useState } from 'react';
import { Button, Card, createStyles, Step, StepLabel, Stepper, Theme } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { useDispatch, useSelector } from 'react-redux';
import { ActionType, State } from '../../model/Interface';

const useStyles = makeStyles((theme: Theme) =>
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
  const steps = ['选择源文件', '设置参数', '核对参数'];
  const state = useSelector(state => state) as State
  const dispatch = useDispatch();

  let activeStep = 0;
  if (state && state.transcode && state.transcode.current_step) {
    activeStep = state.transcode.current_step;
  }

  console.log("activeStep: " + activeStep)

  function changeStepDispatch(index: number) {
    return dispatch({
      type: ActionType.ChangeTranscodeStep,
      payload: index
    })
  }


  return (
    <div className={classes.root}>
      <Card className={classes.step_card}>
        <Stepper activeStep={activeStep}>
          {steps.map((label, index) => {
            return (
              <Step key={label}>
                <StepLabel>{label}</StepLabel>
              </Step>
            );
          })}
        </Stepper>
      </Card>

      <Card className={classes.content_card}>
        <Button onClick={() => changeStepDispatch(activeStep + 1)}>
          {'test'}
        </Button>
      </Card>
    </div>
  );

}
