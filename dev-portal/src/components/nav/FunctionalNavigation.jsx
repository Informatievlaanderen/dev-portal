// Copyright 2018 Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: Apache-2.0

import React from 'react'
import { observer } from 'mobx-react'
import './FunctionalNavigation.scss';

import { isAdmin, isAuthenticated, logout, getLoginRedirectUrl } from 'services/self'
import { cognitoDomain, cognitoClientId } from '../../services/api'

export const FunctionalNavigation = observer(
  class FunctionalNavigation extends React.Component {
    getCognitoUrl = (type) => {
      let redirectUri = getLoginRedirectUrl()
      return `${cognitoDomain}/${type}?response_type=token&client_id=${cognitoClientId}&redirect_uri=${redirectUri}`
    }

    insertAuthMenu() {
      return isAuthenticated() ?
        (
          <ul>
            <li className="vl-functional-header__action"><p>John Bla ({isAdmin() ? "Beheerder" : "Gebruiker"})</p></li>
            <li className="vl-functional-header__action"><p><a onClick={logout}>Meld af</a></p></li>
          </ul>
        ) : (
          <ul>
            <li className="vl-functional-header__action"><p><a href={this.getCognitoUrl('login')}>Aanmelden</a></p></li>
          </ul>
        )
    }

    render() {
      return <header id="vlaanderen-functional-nav" className="vl-functional-header vl-functional-header--has-actions" role="banner">
        <div className="vl-layout">
          <div className="vl-functional-header__row">
            <div className="vl-functional-header__content">
              <h1 className="vl-title">&nbsp;</h1>
            </div>
            <div className="vl-functional-header__actions">
              {this.insertAuthMenu()}
            </div>
            </div>
          </div>
        </header>
    }
  }
)

export default FunctionalNavigation