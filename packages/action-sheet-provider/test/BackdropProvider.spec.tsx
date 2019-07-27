// import React from 'react';
// import {StyleSheet} from 'react-native';
// import {shallow} from 'enzyme';

import React from 'react';
import 'react-native';
import {create} from 'react-test-renderer';

import BackdropProvider from './../src';

describe('<BackdropProvider>', () => {
  it('renders correctly', () => {
    const component = create(<BackdropProvider />);
    expect(component.toJSON()).toMatchSnapshot();
  });
});

// const component = create(<ContextProvider />);
// const instance = component.getInstance();

// expect(instance.getDose()).toBe(5);
// expect(instance.state.productData.dose).toBe("5 mg");

// instance.setDose(2);

// expect(instance.getDose()).toBe(2);
// expect(instance.state.productData.dose).toBe("2 mg");

// const noop = () => {};
// const sampleText = 'foo bar baz';

// describe('<BackdropProvider>', () => {
//   it('should match snapshot', () => {
//     const wrapper = shallow(<BackdropProvider />);
//     expect(wrapper).toMatchSnapshot();
//   });

// TextInput props
// describe('onTouch prop', () => {
//   it('should properly call callback', () => {
//     const onTouchSpy = jest.fn();
//     const component = shallow(<DatePicker onTouch={onTouchSpy} />);
//     component.find('DatePickerInput').simulate('touch');
//     expect(onTouchSpy).toHaveBeenCalledTimes(1);
//   });
// });
// describe('onFocus prop', () => {
//   it('should properly call callback', () => {
//     const onFocusSpy = jest.fn();
//     const component = shallow(<DatePicker onFocus={onFocusSpy} />);
//     component.find('DatePickerInput').simulate('focus');
//     expect(onFocusSpy).toHaveBeenCalledTimes(1);
//   });
// });

//   it('renders external container style from object', () => {
//     const Clone = React.cloneElement(Component, {style: {backgroundColor: 'red'}});
//     const wrapper = shallow(Clone);
//     expect(wrapper).toMatchSnapshot();
//   });

//   it('renders external container style from ID', () => {
//     const styles = StyleSheet.create({
//       containerStyle: {
//         padding: 4
//       }
//     });
//     const Clone = React.cloneElement(Component, {style: styles.containerStyle});
//     const wrapper = shallow(Clone);
//     expect(wrapper).toMatchSnapshot();
//   });

//   it('renders external container style from array', () => {
//     const style1 = {backgroundColor: 'yellow'};
//     const styles = StyleSheet.create({
//       style2: {
//         maxHeight: 32
//       }
//     });
//     const Clone = React.cloneElement(Component, {style: [style1, styles.style2]});
//     const wrapper = shallow(Clone);
//     expect(wrapper).toMatchSnapshot();
//   });

//   it('renders external text style from object', () => {
//     const Clone = React.cloneElement(Component, {textStyle: {color: 'black'}});
//     const wrapper = shallow(Clone);
//     expect(wrapper).toMatchSnapshot();
//   });

//   it('renders external text style from ID', () => {
//     const styles = StyleSheet.create({
//       textStyle: {
//         fontSize: 12
//       }
//     });
//     const Clone = React.cloneElement(Component, {textStyle: styles.textStyle});
//     const wrapper = shallow(Clone);
//     expect(wrapper).toMatchSnapshot();
//   });

//   it('renders external text style from array', () => {
//     const style1 = {color: 'blue'};
//     const styles = StyleSheet.create({
//       style2: {
//         fontFamily: 'sans-serif'
//       }
//     });
//     const Clone = React.cloneElement(Component, {textStyle: [style1, styles.style2]});
//     const wrapper = shallow(Clone);
//     expect(wrapper).toMatchSnapshot();
//   });
// });

// describe('Functionality', () => {
//   it('handles onPress callback', () => {
//     const onPressSpy = jest.fn();
//     const Clone = React.cloneElement(Component, {onPress: onPressSpy});
//     const wrapper = shallow(Clone);
//     wrapper.simulate('press');
//     expect(onPressSpy).toHaveBeenCalledTimes(1);
//   });
// });
