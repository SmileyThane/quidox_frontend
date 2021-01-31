import React from 'react'

import {
  Modal,
  Progress,
  Typography
} from 'antd'

import { Button } from '../../../../components'

import { styleguide } from '../../../../constants'

import { Layout } from './styled'

const { Title } = Typography

const { colors } = styleguide

export default ({
  visible,
  data,
  onSave,
  onCancel
}) => {
  const progressPercent = Math.floor((data.filesUploaded / data.registryData.length) * 100)

  return (
    <Modal
      width={550}
      visible={visible}
      onCancel={onCancel}
      footer={null}
    >
      <Layout>
        <Layout.Icon
          type='file'
          style={{
            color: progressPercent === 100 ? colors.green : colors.primary
          }}
        />

        <Title level={3}>
          {progressPercent === 100
            ? 'Файлы загружены'
            : 'Загрузка файлов'}
        </Title>

        <Layout.Progress>
          <Layout.Progress.Inner>
            <Layout.Progress.Count>
              Файлов к загрузке <Layout.Progress.Value>{data.registryData.length}</Layout.Progress.Value>
            </Layout.Progress.Count>

            <Layout.Progress.Count>
              Загружено <Layout.Progress.Value>{data.filesUploaded}</Layout.Progress.Value>
            </Layout.Progress.Count>

            <Layout.Progress.Count>
              {progressPercent || 0}%
            </Layout.Progress.Count>
          </Layout.Progress.Inner>

          <Progress
            showInfo={false}
            percent={progressPercent}
          />
        </Layout.Progress>

        {data.filesUploaded !== data.registryData.length ? (
          <Button
            type='primary'
            disabled={data.disabled}
            onClick={onSave}
          >
            Сохранить
          </Button>
        ) : (
          <Button
            type='primary'
            onClick={onCancel}
          >
            Закрыть
          </Button>
        )}
      </Layout>
    </Modal>
  )
}
