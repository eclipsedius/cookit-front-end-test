import React, { useState, useEffect } from 'react';
import styled from 'styled-components/macro';
import { NavBar } from 'app/containers/NavBar';
import { Helmet } from 'react-helmet-async';
import { StyleConstants } from 'styles/StyleConstants';
import { useTranslation } from 'react-i18next';
import { translations } from 'locales/translations';

export function ConfirmationForm(props) {
  const { t } = useTranslation();
  return (
    <>
       <Helmet>
        <title>Confirmation</title>
      </Helmet>
      <NavBar />
      <Wrapper>
        <h1>{t(translations.confirmation.title)}</h1>
        <h3>{t(translations.confirmation.email)} {props.location.state.email}</h3>
        <h3>{t(translations.confirmation.postalCode)} {props.location.state.postalCode}</h3>
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