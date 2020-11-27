import { useEffect, useState } from 'react';
import { render } from 'react-dom';
import styled from 'styled-components';

const Label = styled.label`
  font-weight: 500;
  display: block;
`;

const Input = styled.input`
  &:focus + label,
  &:not([value='']):not(:focus) + label {
    background-color: red;
  }
`;

function App() {
  const [inputVal, setInputVal] = useState('');

  useEffect(() => console.log(inputVal));

  return (
    <div>
      <Input value={inputVal} onChange={(e) => setInputVal(e.target.value)} />
      <Label>
        Background should only be red when focused or when value is not an empty
        string.
      </Label>
    </div>
  );
}

render(<App />, document.getElementById('root'));
