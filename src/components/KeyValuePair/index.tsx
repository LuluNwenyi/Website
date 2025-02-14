import React, {FC} from 'react';
import Col from 'antd/es/col';
import Row from 'antd/es/row';
import Typography from 'antd/es/typography';

interface CommonProps {
  title: string;
  value: string | number;

  copyable?:
    | boolean
    | {
        text?: string;
      };
  ellipsis?: boolean;
}

const KeyValuePair: FC<CommonProps> = ({title, value, ...others}) => (
  <Col span={24}>
    <Row>
      <Col xs={14} sm={12} md={10}>
        <Typography.Text strong type="secondary">
          {title}
        </Typography.Text>
      </Col>
      <Col xs={10} sm={12} md={14}>
        <Typography.Text strong {...others}>
          {typeof value === 'number' ? value.toLocaleString() : value}
        </Typography.Text>
      </Col>
    </Row>
  </Col>
);

export default KeyValuePair;
