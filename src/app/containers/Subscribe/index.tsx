import React, { useState, useEffect } from 'react';
import styled from 'styled-components/macro';
import { NavBar } from 'app/containers/NavBar';
import { Helmet } from 'react-helmet-async';
import { StyleConstants } from 'styles/StyleConstants';
import { useTranslation } from 'react-i18next';
import { translations } from 'locales/translations';
import { FormLabel } from 'app/components/FormLabel';
import { Input } from 'app/components/Input';
import axios, {AxiosResponse} from 'axios';
import { Button } from 'app/components/Button';

export function Subscribe(props) {
  const { t } = useTranslation();
  const [errorEmail, setErrorEmail] = useState(false)
  const [errorPostalCode, setErrorPostalCode] = useState(false)
  const [email, setEmail] = useState('');
  const [postalCode, setPostalCode] = useState('');
  const [isValid, setIsValid] = useState(false);
  const emailRegex = /^([a-zA-Z0-9_\-\.]+)@([a-zA-Z0-9_\-\.]+)\.([a-zA-Z]{2,5})$/ 
  const postalCodeRegex = /^[ABCEGHJ-NPRSTVXY]{1}[0-9]{1}[ABCEGHJ-NPRSTV-Z]{1}[ ]?[0-9]{1}[ABCEGHJ-NPRSTV-Z]{1}[0-9]{1}$/
  

  // Function OnSubmit the form
  const handleSubmit = (event) => {
    event.preventDefault();
    // Check if email has the good format
    if(!emailRegex.test(email)) {
      setErrorEmail(true);
    } else {
      setErrorEmail(false);
    }

    // Check if postal code exists on the current list (from API)
    const fetchData = async () => {
      const params = {zip: postalCode}
      const result = await axios.get(
        'https://us-central1-interview-zip-code.cloudfunctions.net/zipTest', {params}
      ).then((response: AxiosResponse) => {
          if (response.data.is_deliverable === false) {
            setErrorPostalCode(true);
            setIsValid(false);
          } else {
            setErrorPostalCode(false);
            setIsValid(true);
          }
      });
    };
    fetchData()

    // Check if postal code has the good format
    if(!postalCodeRegex.test(postalCode)) {
      setErrorPostalCode(true);
    } else {
      setErrorPostalCode(false);
    }

    // If everything is correct, make a redirect to confirmation page with user infos
    if (isValid === true && (emailRegex.test(email) && postalCodeRegex.test(postalCode))) {
      props.history.push("/confirmation", { postalCode: postalCode, email: email });
    }
  };

  useEffect(() => {
    if (isValid === true && (emailRegex.test(email) && postalCodeRegex.test(postalCode))) {
      props.history.push("/confirmation", { postalCode: postalCode, email: email });
    }
  }, [isValid])

  return (
    <>
       <Helmet>
        <title></title>
        <meta name="description" content="" />
      </Helmet>
      <NavBar />
      <Wrapper>
        <h1>{t(translations.subscribe.title)}</h1>
          <Form onSubmit={handleSubmit}>
            <FormLabel htmlFor="email">{t(translations.subscribe.form.email)}</FormLabel>
            <Input type="text" name="email" value={email || ''} onChange={e => setEmail(e.target.value)}/>
            {errorEmail ? <p>{t(translations.subscribe.form.email_error)}</p> : ''}
            <FormLabel htmlFor="postalCode">{t(translations.subscribe.form.postalCode)}</FormLabel>
            <Input type="text" name="postalCode" value={postalCode || ''} onChange={e => setPostalCode(e.target.value)}/>
            {errorPostalCode ? <p>{t(translations.subscribe.form.postalCode_error)}</p> : ''}
            <Button>{t(translations.subscribe.form.submit)}</Button>
          </Form>
      </Wrapper>
    </>
  );
}

const Wrapper = styled.div`
  height: calc(100vh - ${StyleConstants.NAV_BAR_HEIGHT});
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  min-height: 320px;
`;

const Form = styled.form`
  height: calc(100vh - ${StyleConstants.NAV_BAR_HEIGHT});
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  min-height: 320px;
`;