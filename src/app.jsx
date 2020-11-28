import * as react from 'react';
import { render } from 'react-dom';
import styled from 'styled-components';

const Input = styled.input`
  &:focus + label,
  &:not([value='']):not(:focus) + label {
    background-color: red;
  }
`;

function App() {
  const [inputVal, setInputVal] = react.useState('');

  return (
    <div>
      <h1>
        {!react.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED
          .ReactCurrentOwner
          ? 'Preact'
          : 'React'}
      </h1>
      <Input value={inputVal} onChange={(e) => setInputVal(e.target.value)} />
      <label>
        Background should only be red when focused or when value is not an empty
        string.
      </label>
    </div>
  );
}

render(<App />, document.getElementById('root'));
