import { StyleSheet } from 'react-native';

export default StyleSheet.create({
  '*': {
    'padding': [{ 'unit': 'px', 'value': 0 }, { 'unit': 'px', 'value': 0 }, { 'unit': 'px', 'value': 0 }, { 'unit': 'px', 'value': 0 }],
    'margin': [{ 'unit': 'px', 'value': 0 }, { 'unit': 'px', 'value': 0 }, { 'unit': 'px', 'value': 0 }, { 'unit': 'px', 'value': 0 }],
    'boxSizing': 'border-box',
    'WebkitBoxSizing': 'border-box'
  },
  'ul': {
    'listStyleType': 'none'
  },
  'a': {
    'color': 'inherit',
    'textDecoration': 'none'
  },
  // html,body{
	background-color: rgb(239,239,244);
}
  'slide-left-enter-active': {
    'transition': 'transform .5s',
    'transformOrigin': 'left'
  },
  'slide-left-leave-active': {
    'transition': 'transform .5s',
    'transformOrigin': 'left'
  },
  'slide-left-enter': {
    'transform': 'scale(0,1)'
  },
  'slide-left-leave-active': {
    'transform': 'scale(0,1)'
  },
  'mint-button': {
    'fontSize': [{ 'unit': 'string', 'value': 'inherit' }]
  },
  'mint-button--small': {
    'height': [{ 'unit': 'px', 'value': 30 }],
    'padding': [{ 'unit': 'px', 'value': 0 }, { 'unit': 'px', 'value': 10 }, { 'unit': 'px', 'value': 0 }, { 'unit': 'px', 'value': 10 }]
  },
  'mint-cell-wrapper': {
    'fontSize': [{ 'unit': 'em', 'value': 1 }],
    'backgroundImage': 'none'
  },
  'mint-checklist-label': {
    'padding': [{ 'unit': 'px', 'value': 0 }, { 'unit': 'px', 'value': 0 }, { 'unit': 'px', 'value': 0 }, { 'unit': 'px', 'value': 0 }]
  },
  'mint-checklist-title': {
    'display': 'none'
  },
  'mint-checkbox-label': {
    'marginLeft': [{ 'unit': 'px', 'value': 0 }]
  },
  'mint-popup-bottom': {
    'width': [{ 'unit': '%H', 'value': 1 }]
  },
  '[v-cloak]': {
    'display': 'none'
  },
  'i-body': {
    'overflow': 'hidden'
  },
  'i-main': {
    'marginTop': [{ 'unit': 'px', 'value': 50 }]
  },
  'i-mt-field': {
    'padding': [{ 'unit': 'px', 'value': 0 }, { 'unit': 'px', 'value': 10 }, { 'unit': 'px', 'value': 0 }, { 'unit': 'px', 'value': 10 }],
    'minHeight': [{ 'unit': 'px', 'value': 48 }],
    'backgroundColor': '#fff'
  },
  'i-image-box': {
    'position': 'relative',
    'backgroundColor': 'lightgray'
  },
  'i-image-box:after': {
    'display': 'block',
    'content': ''''
  },
  'i-flex': {
    'display': 'flex'
  },
  'i-flex1': {
    'flex': '1'
  },
  'i-flex2': {
    'flex': '2'
  },
  'i-flex3': {
    'flex': '3'
  },
  'i-flex4': {
    'flex': '4'
  },
  'i-text-align-right': {
    'textAlign': 'right'
  },
  'i-text-align-center': {
    'textAlign': 'center'
  },
  'i-errorTip': {
    'padding': [{ 'unit': 'px', 'value': 20 }, { 'unit': 'px', 'value': 20 }, { 'unit': 'px', 'value': 20 }, { 'unit': 'px', 'value': 20 }],
    'textAlign': 'center'
  },
  'i-float-left': {
    'float': 'left'
  },
  'i-float-right': {
    'float': 'right'
  },
  'i-float-clear:after': {
    'content': ''\200B'',
    'display': 'block',
    'height': [{ 'unit': 'px', 'value': 0 }],
    'clear': 'both'
  },
  'i-request-tip': {
    'textAlign': 'center',
    'padding': [{ 'unit': 'px', 'value': 10 }, { 'unit': 'px', 'value': 10 }, { 'unit': 'px', 'value': 10 }, { 'unit': 'px', 'value': 10 }]
  },
  '[readonly="readonly"]': {
    'pointerEvents': 'none'
  },
  'i-request-tip': {
    'textAlign': 'center',
    'padding': [{ 'unit': 'px', 'value': 20 }, { 'unit': 'px', 'value': 20 }, { 'unit': 'px', 'value': 20 }, { 'unit': 'px', 'value': 20 }],
    'backgroundColor': '#fff'
  },
  '#app': {
    'overflow': 'hidden',
    'fontFamily': '"微软雅黑"'
  },
  '#app mint-headeris-fixed': {
    'zIndex': '9999999'
  }
});
