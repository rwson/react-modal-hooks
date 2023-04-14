import React, { useMemo, useEffect, FC, useState, ReactElement, useCallback, createElement, useRef } from 'react'

import { ModalActionType } from '../constants'
import { useModalContext } from '../context'
import { ModalItem, UpdateModalParams } from '../types'
import { WrappedModalComponent } from '../wrapped'

export const useUpdateModal = () => {
  const { state, dispatch, defaultProps } = useModalContext()

  const update = () => {}
  return update
}