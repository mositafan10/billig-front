import React, { Component } from 'react';
import moment from 'moment';

const style = {fontSize:"12px"}
class TimeDiff extends Component {
    
    
    render() {
    var time = moment(this.props.data).format();
    var now = moment().format();
    var relative_minute = moment(time).diff(now,'minutes');
    var relative_hour = moment(time).diff(now,'hours');
    var relative_days = moment(time).diff(now,'days');
    var relative_week = moment(time).diff(now,'week');
    var relative_month = moment(time).diff(now,'months');

        if (  Math.abs(relative_month) >= 1 ){
            return <p style={style}>{Math.abs(relative_month)} ماه پیش</p>
        } 
        else if ( Math.abs(relative_week) >= 1) {
            return <p style={style}>{Math.abs(relative_week)} هفته پیش</p>
        }
        else if ( Math.abs(relative_days) >= 1) {
            return <p style={style}>{Math.abs(relative_days)} روز پیش</p>
        }
        else if ( Math.abs(relative_hour) >= 1) {
            return <p style={style}>{Math.abs(relative_hour)} ساعت پیش</p>
        }
        else if ( Math.abs(relative_minute) >= 1) {
            return <p style={style}>{Math.abs(relative_minute)} دقیقه پیش</p>
        }
        else {
            return <p style={style}> لحظاتی پیش</p>
        }
    }
}

export default TimeDiff;