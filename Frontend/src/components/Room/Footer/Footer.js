import React from "react";
import classes from "./Footer.module.css";
import { withStyles,makeStyles } from '@material-ui/core/styles';
import {Typography,Button,Grid,Slider,Tooltip,Paper,Popover,IconButton} from "@material-ui/core";


import PauseCircleFilledIcon from '@material-ui/icons/PauseCircleFilled';
import PlayCircleFilledIcon from '@material-ui/icons/PlayCircleFilled';

import VolumeUp from "@material-ui/icons/VolumeUp";
import VolumeDown from "@material-ui/icons/VolumeDown";
import VolumeMute from "@material-ui/icons/VolumeOff";
import FullScreen from "@material-ui/icons/Fullscreen";

import BookmarkIcon from "@material-ui/icons/Bookmark";
import FastRewindIcon from "@material-ui/icons/FastRewind";
import FastForwardIcon from "@material-ui/icons/FastForward";
import PlayArrowIcon from "@material-ui/icons/PlayArrow";
import PauseIcon from "@material-ui/icons/Pause";


const PrettoSlider = withStyles({
  root: {
    height: 8,
    width: "80%"
  },
  thumb: {
    height: 18,
    width: 18,
    backgroundColor: "#fff",
    border: "1px solid currentColor",
    marginTop: -8,
    marginLeft: -12
  },
  active: {},
  valueLabel: {
    left: "calc(-50% + 4px)",
  },
  track: {
    height: 4,
    borderRadius: 4,
  },
  rail: {
    height: 4,
    borderRadius: 4,
  },
})(Slider);

function ValueLabelComponent(props) {
  const { children, open, value } = props;

  return (
    <Tooltip open={open} enterTouchDelay={0} placement="top" title={value}>
      {children}
    </Tooltip>
  );
}


const Footer = (props) => {

    return (
        
        <div className={classes.main_footer}>
            <Grid container alignItems="center" style={{width:"70%",paddingTop:"10px"}}>
                    <div style={{ display:"flex"}}>
                       <img src={props.playimg} alt="img" style={{ padding:"20px"}}></img>
                       <div>
                           <h3>Drake Songs</h3>
                           <p>Rap song</p>
                       </div>
                       <i className="fas fa-info-circle" style={{display:"block", marginLeft:"auto", 
                        marginTop:"10px", marginRight:"10px", fontSize:"medium"} }>
                       </i>
                   </div>
            </Grid>
            <Grid
              container
              direction="row"
              style={{ flexGrow: 1 , paddingRight:"30px"}}
            >
                
                <Grid container direction="row" alignItems="center" justify="center">
                    <IconButton
                      onClick={props.onRewind}
                      className={classes.controlIcons}
                      aria-label="rewind"
                    >
                      <FastRewindIcon
                        className={classes.controlIcons}
                        fontSize="inherit"
                      />
                    </IconButton>
                    <IconButton
                      onClick={props.onPlayPause}
                      className={classes.controlIcons}
                      aria-label="play"
                    >
                      {props.playing ? (
                        <PauseIcon fontSize="inherit" />
                      ) : (
                        <PlayArrowIcon fontSize="inherit" />
                      )}
                    </IconButton>
                    <IconButton
                      onClick={props.onFastForward}
                      className={classes.controlIcons}
                      aria-label="forward"
                    >
                      <FastForwardIcon fontSize="inherit" />
                    </IconButton>
                </Grid>
                <Grid container direction="row" alignItems="center" justify="center">
                    <PrettoSlider
                        min={0}
                        max={100}
                        ValueLabelComponent={(tim) => (
                          <ValueLabelComponent {...tim} value={props.elapsedTime} />
                        )}
                        aria-label="custom thumb label"
                        value={props.played * 100}
                        onChange={props.onSeek}
                        onMouseDown={props.onSeekMouseDown}
                        onChangeCommitted={props.onSeekMouseUp}
                        onDuration={props.onDuration}
                      />
                    <span
                      variant="text"
                      onClick={
                        props.onChangeDispayFormat
                      }
                    >
                      <Typography
                        variant="body1"
                        style={{ color: "#000" ,paddingLeft:"15px",marginTop:"-6px"}}
                      >
                        {props.elapsedTime}/{props.totalDuration}
                      </Typography>
                    </span>
                </Grid>
            </Grid>
            <Grid align="right" style={{width:"70%"}}>

                <IconButton
                  // onClick={() => props.setState({ ...state, muted: !state.muted })}
                  onClick={props.onMute}
                  className={`${classes.bottomIcons} ${classes.volumeButton}`}
                >
                  {props.muted ? (
                    <VolumeMute fontSize="large" />
                  ) : props.volume > 0.5 ? (
                    <VolumeUp fontSize="large" />
                  ) : (
                    <VolumeDown fontSize="large" />
                  )}
                </IconButton>

                <Slider
                  min={0}
                  max={100}
                  value={props.muted ? 0 : props.volume * 100}
                  onChange={props.onVolumeChange}
                  aria-labelledby="input-slider"
                  onMouseDown={props.onSeekMouseDown}
                  onChangeCommitted={props.onVolumeSeekDown}
                  style={{width:"150px",marginBottom:"-8px"}}
                />
            </Grid>
            <Grid alignItems="right">
              <IconButton
                onClick={props.onToggleFullScreen}
                className={classes.bottomIcons}
                style={{paddingLeft:"40px"}}    
              >
                <FullScreen fontSize="large" />
              </IconButton>
            </Grid>

        </div>
    );
};

export default Footer;
