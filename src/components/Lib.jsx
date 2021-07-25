import styled from "styled-components";

export const Flex = styled.div`
  display: flex;
  flex-direction: ${({ flexDirection = 'row' }) => flexDirection };
  justify-content: ${({ justifyContent = 'center' }) => justifyContent };
  align-items: ${({ alignItems = 'center' }) => alignItems };
  width: ${({ width }) => width ? width : 'auto'};
  height: ${({ height }) => height ? height : 'auto'};
  padding: ${({ padding }) => padding ? padding : '0'};
  margin: ${({ margin }) => margin ? margin : '0'};
`;

export const Input = styled.input`
    display: block;
    width: 100%;
    font-family: inherit;
    color: rgb(255, 255, 255);
    padding: 0px 0px 8px;
    border: none;
    outline: none;
    border-radius: 0px;
    appearance: none;
    background-image: none;
    background-position: initial;
    background-size: initial;
    background-repeat: initial;
    background-attachment: initial;
    background-origin: initial;
    background-clip: initial;
    transform: translateZ(0px);
    font-size: 30px;
    -webkit-font-smoothing: antialiased;
    line-height: unset;
    -webkit-text-fill-color: rgba(255, 255, 255, 0.3);
    animation: 1ms ease 0s 1 normal none running native-autofill-in;
    transition: background-color 1e+08s ease 0s, box-shadow 0.1s ease-out 0s;
    box-shadow: rgb(255 255 255 / 30%) 0px 1px;
    background-color: transparent !important;

`;

export const Button = styled.button`
  width: 20vw;
  height:6vh;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-top: 2vh; 
  text-align: center;
  vertical-align: middle;
  background-color: ${({ color }) => color ? color : "var(--main)" };
  color: var(--white);
  border-radius: var(--border-radius);
  padding: ${({ padding }) => padding ? padding : '0'};
  font-weight: bold;
  margin: ${({ margin }) => margin ? margin : '0'};
`;

export const ExternalLink = ({ children, ...props }) => <a target="_blank" rel="noopener noreferrer" {...props}>{children}</a>;