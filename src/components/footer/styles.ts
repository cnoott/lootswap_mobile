import styled from 'styled-components/native';

export const Badge = styled.View`
  background-color: red;
  height: 16px;
  width: 16px;
  border-radius: 9px;
  justify-content: center;
  align-items: center;
  position: absolute;
  top: -3px;
  right: -3px;
`;

export const BadgeText = styled.Text`
  color: white;
  font-size: 14px;
  font-family: Urbanist-Bold;
`;
