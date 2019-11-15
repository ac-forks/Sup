import React, {FC, memo} from 'react';
import {Text, StyleSheet, TextStyle} from 'react-native';
import {connect} from 'react-redux';
import {RootState} from '../../reducers';
import px from '../../utils/normalizePixel';
import withTheme, {ThemeInjectedProps} from '../../contexts/theme/withTheme';

type Props = ReturnType<typeof mapStateToProps> &
  ThemeInjectedProps & {
    userId: string;
    isMe: boolean;
    style?: TextStyle;
  };

const Name: FC<Props> = memo(({name, isMe, style, theme}) => (
  <Text style={[styles.text, {color: isMe ? '#fff' : theme.foregroundColor}, style]}>
    {name || 'loading...'}
  </Text>
));

const styles = StyleSheet.create({
  text: {
    fontSize: px(12.5),
    color: '#fff',
    marginBottom: px(2.5),
    fontWeight: '500',
  },
});

const mapStateToProps = (state: RootState, ownProps) => {
  let user = state.entities.users.byId[ownProps.userId];
  return {
    name: user && (user.profile.display_name_normalized || user.profile.real_name_normalized),
  };
};

export default connect(mapStateToProps)(withTheme(Name));