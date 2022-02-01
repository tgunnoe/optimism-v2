import React from 'react'
import { connect } from 'react-redux'
import { isEqual } from 'lodash'

import { openModal } from 'actions/uiAction'
import Button from 'components/button/Button'

import ExpandMoreIcon from '@material-ui/icons/ExpandMore'

import { Box, Typography, Fade } from '@material-ui/core'
import * as S from './ListAccount.styles'

import LayerSwitcher from 'components/mainMenu/layerSwitcher/LayerSwitcher'
import { getCoinImage } from 'util/coinImage'

class ListAccountBatch extends React.Component {

  constructor(props) {

    super(props)

    const {
      token,
      chain,
      networkLayer,
      disabled,
      loading
    } = this.props

    this.state = {
      token,
      chain,
      dropDownBox: false,
      networkLayer,
      disabled,
      loading
    }

  }

  componentDidUpdate(prevState) {

    const {
      token,
      chain,
      networkLayer,
      disabled,
      loading
    } = this.props

    if (!isEqual(prevState.token, token)) {
      this.setState({ token })
    }

    if (!isEqual(prevState.chain, chain)) {
      this.setState({ chain })
    }

    if (!isEqual(prevState.networkLayer, networkLayer)) {
      this.setState({ networkLayer })
    }

    if (!isEqual(prevState.disabled, disabled)) {
      this.setState({ disabled })
    }

    if (!isEqual(prevState.loading, loading)) {
      this.setState({ loading })
    }

  }

  handleModalClick(modalName, token, fast) {
    this.props.dispatch(openModal(modalName, token, fast))
  }

  render() {

    const {
      token,
      chain,
      dropDownBox,
      networkLayer,
      disabled
    } = this.state

    const enabled = (networkLayer === chain) ? true : false

    const logoList = ['ETH', 'BOBA', 'OMG', 'USDC', 'USDT', 'DAI']

    return (
      <>
        <S.Content>
            <S.TableBody disabled={true}>

              <S.TableCell sx={{gap: "10px", justifyContent: "flex-start"}}>
                {logoList.map((token, index) => {
                  return <img key={index} src={getCoinImage(token)} alt="logo" width={42} height={42} style={index !== 0 ? {marginLeft: -20}:{}}/>
                })

                }
              </S.TableCell>

              <S.TableCell sx={{justifyContent: "flex-start"}}>
              </S.TableCell>

              <S.TableCell
                onClick={() => {
                  this.setState({
                    dropDownBox: !dropDownBox,
                    dropDownBoxInit: false
                  })
                }}
                sx={{cursor: "pointer", gap: "5px", justifyContent: "flex-end"}}
              >
                {chain === 'L1' &&
                  <S.TextTableCell enabled={`${enabled}`} variant="body2" component="div">
                    Bridge In Batch
                  </S.TextTableCell>
                }
                <Box sx={{display: "flex", opacity: !enabled ? "0.4" : "1.0", transform: dropDownBox ? "rotate(-180deg)" : ""}}>
                  <ExpandMoreIcon sx={{width: "12px"}}/>
                </Box>
              </S.TableCell>
            </S.TableBody>

          {/*********************************************/
          /**************  Drop Down Box ****************/
          /**********************************************/
          }

          {dropDownBox ? (
          <Fade in={dropDownBox}>
            <S.DropdownWrapper>
              {!enabled && chain === 'L1' &&
                <S.AccountAlertBox>
                  <Box
                       sx={{
                         flex: 1,
                       }}
                     >
                       <Typography variant="body2" component="p" >
                         You are on L2. To use L1, click SWITCH LAYER
                       </Typography>
                     </Box>
                     <Box sx={{ textAlign: 'center'}}>
                       <LayerSwitcher isButton={true} />
                     </Box>
                </S.AccountAlertBox>
              }

              {!enabled && chain === 'L2' &&
                <S.AccountAlertBox>
                  <Box
                       sx={{
                         flex: 1,
                       }}
                     >
                       <Typography variant="body2" component="p" >
                         You are on L1. To use L2, click SWITCH LAYER
                       </Typography>
                     </Box>
                     <Box sx={{ textAlign: 'center'}}>
                       <LayerSwitcher isButton={true} />
                     </Box>
                </S.AccountAlertBox>
              }

              {enabled && chain === 'L1' &&
                <Button
                  onClick={()=>{this.handleModalClick('depositBatchModal', token, true)}}
                  color='primary'
                  disabled={disabled}
                  variant="contained"
                  tooltip="A swap-based bridge to Boba L2. This option is only available if the pool balance is sufficient."
                  fullWidth
                >
                  Fast Bridge to L2
                </Button>
              }

              {enabled && chain === 'L2' &&
                <>
                  <Button
                    onClick={()=>{this.handleModalClick('exitModal', token, false)}}
                    variant="outlined"
                    disabled={disabled}
                    tooltip="Classic Bridge to L1. This option is always available but has a 7 day delay before receiving your funds."
                    fullWidth
                  >
                    Bridge to L1
                  </Button>

                  <Button
                    onClick={()=>{this.handleModalClick('exitModal', token, true)}}
                    variant="contained"
                    disabled={disabled}
                    tooltip="A swap-based bridge to L1 without a 7 day waiting period. There is a fee, however, and this option is only available if the pool balance is sufficient."
                    fullWidth
                  >
                    Fast Bridge to L1
                  </Button>

                  <Button
                    onClick={()=>{this.handleModalClick('transferModal', token, false)}}
                    variant="contained"
                    disabled={disabled}
                    tooltip="Transfer funds from one L2 account to another L2 account."
                    fullWidth
                  >
                    Transfer
                  </Button>
                </>
              }
            </S.DropdownWrapper>
          </Fade>
          ) : null}
        </S.Content>
      </>
    )
  }
}

const mapStateToProps = state => ({ })
export default connect(mapStateToProps)(ListAccountBatch)
