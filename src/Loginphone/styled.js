import styled from "styled-components";
import { Flex } from "../components/Lib";
import Lottie from 'react-lottie';


export const InputProps = {
  width: '100%',
  margin: "45px 0 0 0"
}

export const Animation = styled(Lottie)`
  width: 400px;
  background-color: var(--black-light);
`;

export const Container = styled(Flex)`
  flex-direction: column;
  justify-content: flex-start;
  width: 80vw;
  height: 85vh;
  padding: 6vh 0 0;
  overflow: hidden;
  background-color: var(--black-light);
  margin: 0 auto;
  max-width: 400px;
`;

export const FormButtons = styled(Flex)`
  position: absolute;
  width: 100%;
  bottom: 60px;
  right: 0;
`;

export const Input = styled.input`
  position: relative;
  width: 100%;
  height: 100%;
`;

export const LoginForm = styled.form`
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100%;
`;

export const Label = styled.label`
  position: relative;
  width: 100%;
  span {
    color: var(--white);
    position: absolute;
    top: 20px;
    font-size: 0.7rem;
  }
`;