import React, { Component } from 'react'
import PropTypes from 'prop-types'
import PageContainer from '../../page-container'
import { Tabs, Tab } from '../../tabs'
import AdvancedTabContent from './advanced-tab-content'
import BasicTabContent from './basic-tab-content'

export default class GasModalPageContainer extends Component {
  static contextTypes = {
    t: PropTypes.func,
  }

  static propTypes = {
    hideModal: PropTypes.func,
    updateCustomGasPrice: PropTypes.func,
    updateCustomGasLimit: PropTypes.func,
    customGasPrice: PropTypes.number,
    customGasLimit: PropTypes.number,
    gasPriceButtonGroupProps: PropTypes.object,
    infoRowProps: PropTypes.shape({
      originalTotalFiat: PropTypes.string,
      originalTotalEth: PropTypes.string,
      newTotalFiat: PropTypes.string,
      newTotalEth: PropTypes.string,
    }),
    onSubmit: PropTypes.func,
    customModalGasPriceInHex: PropTypes.string,
    customModalGasLimitInHex: PropTypes.string,
  }

  state = {}

  renderBasicTabContent (gasPriceButtonGroupProps) {
    return (
      <BasicTabContent
        gasPriceButtonGroupProps={gasPriceButtonGroupProps}
      />
    )
  }

  renderAdvancedTabContent ({
    convertThenUpdateCustomGasPrice,
    convertThenUpdateCustomGasLimit,
    customGasPrice,
    customGasLimit,
    newTotalFiat,
  }) {
    return (
      <AdvancedTabContent
        updateCustomGasPrice={convertThenUpdateCustomGasPrice}
        updateCustomGasLimit={convertThenUpdateCustomGasLimit}
        customGasPrice={customGasPrice}
        customGasLimit={customGasLimit}
        millisecondsRemaining={91000}
        totalFee={newTotalFiat}
      />
    )
  }

  renderInfoRow (className, totalLabelKey, fiatTotal, cryptoTotal, sendAmount, transactionFee) {
    return (
      <div className={className}>
        <div className={`${className}amount-info`}>
          <span className={`${className}__total-info__total-label`}>{`Send Amount`}</span>
          <span className={`${className}__total-info__total-value`}>{sendAmount}</span>
        </div>
        <div className={`${className}__fee-info`}>
          <span className={`${className}__sum-info__sum-label`}>{`Transaction Fee`}</span>
          <span className={`${className}__sum-info__sum-value`}>{transactionFee}</span>
        </div>
        <div className={`${className}__total-info`}>
          <span className={`${className}__sum-info__sum-label`}>{`New Total`}</span>
          <span className={`${className}__sum-info__sum-value`}>{cryptoTotal}</span>
        </div>
        <div className={`${className}__fiat-total-info`}>
          <span className={`${className}__sum-info__sum-value`}>{fiatTotal}</span>
        </div>
      </div>
    )
  }

  renderInfoRows (newTotalFiat, newTotalEth, sendAmount, transactionFee) {
    return (
      <div>
        <div className={'gas-modal-content__info-row'}>
          <div className={`${'gas-modal-content__info-row'}__amount-info`}>
            <span className={`${'gas-modal-content__info-row'}__amount-info__total-label`}>{`Send Amount`}</span>
            <span className={`${'gas-modal-content__info-row'}__amount-info__total-value`}>{sendAmount}</span>
          </div>
          <div className={`${'gas-modal-content__info-row'}__fee-info`}>
            <span className={`${'gas-modal-content__info-row'}__fee-info__sum-label`}>{`Transaction Fee`}</span>
            <span className={`${'gas-modal-content__info-row'}__fee-info__sum-value`}>{transactionFee}</span>
          </div>
          <div className={`${'gas-modal-content__info-row'}__total-info`}>
            <span className={`${'gas-modal-content__info-row'}__total-info__total-label`}>{`New Total`}</span>
            <span className={`${'gas-modal-content__info-row'}__total-info__total-value`}>{newTotalEth}</span>
          </div>
          <div className={`${'gas-modal-content__info-row'}__fiat-total-info`}>
            <span className={`${'gas-modal-content__info-row'}__fiat-total-info__sum-value`}>{newTotalFiat}</span>
          </div>
        </div>
      </div>
    )
  }

  renderTabs ({
    originalTotalFiat,
    originalTotalEth,
    newTotalFiat,
    newTotalEth,
    sendAmount,
    transactionFee,
  },
  {
    gasPriceButtonGroupProps,
    hideBasic,
    ...advancedTabProps
  }) {
    let tabsToRender = [
      { name: 'basic', content: this.renderBasicTabContent(gasPriceButtonGroupProps) },
      { name: 'advanced', content: this.renderAdvancedTabContent(advancedTabProps) },
    ]

    if (hideBasic) {
      tabsToRender = tabsToRender.slice(1)
    }

    return (
      <Tabs>
        {tabsToRender.map(({ name, content }, i) => <Tab name={this.context.t(name)} key={`gas-modal-tab-${i}`}>
            <div className="gas-modal-content">
              { content }
              { this.renderInfoRows(newTotalFiat, newTotalEth, sendAmount,transactionFee) }
            </div>
          </Tab>
        )}
      </Tabs>
    )
  }

  render () {
    const {
      cancelAndClose,
      infoRowProps,
      onSubmit,
      customModalGasPriceInHex,
      customModalGasLimitInHex,
      ...tabProps
    } = this.props

    return (
      <div className="gas-modal-page-container">
        <PageContainer
          title={this.context.t('customGas')}
          subtitle={this.context.t('customGasSubTitle')}
          tabsComponent={this.renderTabs(infoRowProps, tabProps)}
          disabled={false}
          onCancel={() => cancelAndClose()}
          onClose={() => cancelAndClose()}
          onSubmit={() => {
            onSubmit(customModalGasLimitInHex, customModalGasPriceInHex)
            cancelAndClose()
          }}
          submitText={this.context.t('save')}
          headerCloseText={'Close'}
          hideCancel={true}
        />
      </div>
    )
  }
}
