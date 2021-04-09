import * as React from 'react';
import { ConfirmationForm } from '..';
import { createRenderer } from 'react-test-renderer/shallow';

const shallowRenderer = createRenderer();

describe('<ConfirmationForm />', () => {
  it('should render and match the snapshot', () => {
    const location = { state: { 
        email: 'johndoe@test.com', 
        postalCode: 'XXX XXX' 
    }};
    shallowRenderer.render(<ConfirmationForm location={location}/>);
    const renderedOutput = shallowRenderer.getRenderOutput();
    expect(renderedOutput).toMatchSnapshot();
  });
});
