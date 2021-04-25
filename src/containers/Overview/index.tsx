import React, {FC, useEffect, useState} from 'react';
import {Card, Col, Divider, Grid, Row, Space, Table, Typography} from 'antd';
import axios from 'axios';

import {NetworkStats, PageContentsLayout, TableHeader, TestnetAlertMessage} from 'components';
import {BANK_URL, CORS_BRIDGE} from 'constants/url';
import {blocksColumn, blocksData} from 'data/tableData/blocks';
import {responsiveWidth} from 'utils/responsive';
import {useTransactionColumn} from 'hooks/useTransactionColumn';

const {useBreakpoint} = Grid;

interface ComponentProps {
  type?: 'mainnet' | 'testnet';
}

const Overview: FC<ComponentProps> = ({type = 'mainnet'}) => {
  const transactionColumn = useTransactionColumn();
  const [blockData, setBlockData] = useState<any[]>([]);
  const [transactionData, setTransactionData] = useState<any[]>([]);

  const isMainnet = type === 'mainnet';
  const screens = useBreakpoint();

  /* eslint-disable sort-keys */
  const infoPaneWidth = responsiveWidth(screens, {
    xxl: '180px',
    xl: '140px',
    lg: '120px',
    md: '50px',
    sm: '50px',
    xs: '50px',
  });

  const defaultOptions = {limit: 10, offset: 0};
  useEffect(() => {
    axios.get(`${CORS_BRIDGE}/${BANK_URL}/bank_transactions?limit=10&offset=0`).then((res: any) => {
      console.log(res.data.results);

      const data = res.data.results.map((transaction: any) => {
        return {
          coins: transaction.amount,
          recipient: transaction.recipient,
          sender: transaction.block.sender,
          time: transaction.block.modified_date,
        };
      });

      setTransactionData(data);
    });

    // axios.get(`${CORS_BRIDGE}/${BANK_URL}/blocks?limit=10&offset=0`).then((res: any) => {

    // });
  }, []);

  return (
    <>
      <PageContentsLayout>
        <Col span={24}>{isMainnet ? <NetworkStats /> : <TestnetAlertMessage />}</Col>

        <Col sm={24} md={12}>
          <Row>
            <Table
              bordered
              dataSource={blocksData(10)}
              columns={blocksColumn}
              pagination={false}
              title={() => <TableHeader title="Latest Blocks" buttonLink={''} />}
            />
          </Row>
        </Col>

        <Col sm={24} md={12}>
          <Table
            bordered
            dataSource={transactionData}
            columns={transactionColumn}
            pagination={false}
            title={() => <TableHeader title="Latest Transactions" buttonLink={''} />}
          />
        </Col>
      </PageContentsLayout>
    </>
  );
};

export default Overview;
