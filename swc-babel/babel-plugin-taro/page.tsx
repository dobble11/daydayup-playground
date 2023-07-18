import React from 'react';
import myhoc from 'hoc';
type Props = {};

const App = (props: Props) => {
  return <div>App</div>;
};

// @nohoc
export default myhoc(App);
