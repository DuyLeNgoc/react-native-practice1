import Colors from 'config/colors';

const type = {
  base: 'Roboto-Regular',
  bold: 'Roboto-Bold',
  emphasis: 'HelveticaNeue-Italic'
};

const size = {
  input: 18,
  regular: 17,
  medium: 14,
  small: 12,
  tiny: 8.5
};

const style = {
  headings: {
    fontFamily: type.base,
    color: Colors.blue,
    fontSize: size.input
  },
  lightHeading: {
    color: Colors.lightGrey,
    fontSize: size.medium,
    fontFamily: type.base
  },
  whiteHeading: {
    backgroundColor: Colors.transparent,
    color: Colors.white,
    fontFamily: type.base,
    fontSize: size.medium
  },
  normal: {
    fontFamily: type.base,
    fontSize: size.regular,
    backgroundColor: Colors.transparent
  },
  description: {
    fontFamily: type.base,
    fontSize: size.medium
  },
  link: {
    color: Colors.white,
    fontSize: size.medium
  },
  errorText: {
    color: Colors.errors,
    fontFamily: type.bold
  }
};

export default {
  type,
  size,
  style
};
