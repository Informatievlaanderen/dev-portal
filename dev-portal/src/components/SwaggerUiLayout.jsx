// Copyright 2018 Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: Apache-2.0

import React from 'react'

// services
import { subscribe, unsubscribe } from 'services/api-catalog'
import { isAuthenticated } from 'services/self'

import { GetSdkButton } from 'components/GetSdk'

// state
import { observer } from 'mobx-react'
import { store } from 'services/state.js'

// Create the plugin that provides our layout component
//export const SwaggerLayoutPlugin = () => ({ components: { InfoContainer: InfoReplacement } })
export const SwaggerLayoutPlugin = () => ({
  components: {
    InfoContainer: InfoReplacement,
    SchemesContainer: SchemesReplacement,
    AuthorizeBtnContainer: AuthorizeBtnReplacement,
    ServersContainer: ServersReplacement,
    operations: OperationsReplacement
  }
})

const SchemesReplacement = observer(({ specSelectors }) => {
  return (<div></div>)
})

const ServersReplacement = observer(({ specSelectors }) => {
  return (<div></div>)
})

const AuthorizeBtnReplacement = observer(({ specSelectors }) => {
  return (<div></div>)
})

const OperationsReplacement = observer(({ specSelectors }) => {
  return (<div></div>)
})

// replaces the InfoContainer component
// https://github.com/swagger-api/swagger-ui/blob/dd3afdc45656bda2a64ae6a7f9bdad006ea98149/src/core/components/layouts/base.jsx

const InfoReplacement = observer(({ specSelectors }) => {
  const basePath = specSelectors.basePath()
  const host = specSelectors.host()
  // const externalDocs = specSelectors.externalDocs()

  return (
    <Container fluid textAlign='left' className="fixfloat" style={{ padding: "40px 0px" }}>
      <div style={{ display: "flex" }}>
        <div>
          <Header as='h1'>{store.api.swagger.info.title}</Header>
          <div style={{ display: "flex" }}>
            <div style={{ marginRight: "20px" }}>
              {store.api.generic && (
                <p style={{ fontWeight: "bold" }}>Version</p>
              )}
              <p style={{ fontWeight: "bold" }}>Endpoint</p>
              {/* <p style={{ fontWeight: "bold" }}>Usage Plan</p> */}
            </div>
            <div>
              {store.api.generic && (
                <p>{store.api.swagger.info.version}</p>
              )}
              <p>https://{host}{basePath}</p>
              {/* <p>{store.api.usagePlan.name}</p> */}
            </div>
          </div>
          {/* <p>{externalDocs}</p> */}
          <SubscriptionButtons />
          {store.api.sdkGeneration && <GetSdkButton />}
        </div>
      </div>
    </Container>
  )
})

const SubscriptionButtons = observer(class SubscriptionButtons extends React.Component {
  state = {}

  render() {
    const { api } = store
    return (
      (api && isAuthenticated()) ? !api.generic ? (
        api.subscribed ? (
          <Button onClick={() => unsubscribe(api.usagePlan.id)}>Unsubscribe</Button>
        ) : (
          <Button onClick={() => subscribe(api.usagePlan.id)} >Subscribe</Button>
        )
      ) : <Header as='h4' color='grey'>This API is not configured for subscription from the portal.</Header> : null
    )
  }
})

export default SwaggerLayoutPlugin