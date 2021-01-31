import { useMemo } from 'react';
import { Table, Button } from 'antd';
import { useSelector, useDispatch } from 'react-redux';
import styled from 'styled-components';

import Candidate from 'interfaces/candidate.interface';
import { deleteCandidate } from 'store/actions/candidate';
import { ColumnsType } from 'antd/lib/table';

type Props = {
  onEdit: (id: string) => void;
  dataSource: Array<Candidate>;
  rowSelection: any;
};

const CandidateTable = ({ rowSelection, onEdit, dataSource = [] }: Props) => {
  const dispatch = useDispatch();

  const handleOnDelete = (id: string) => {
    dispatch(deleteCandidate([id]));
  };

  const handleOnEdit = (id: string) => {
    onEdit(id);
  };

  const columns: ColumnsType<Candidate> = useMemo(
    () => [
      {
        title: 'NAME',
        dataIndex: 'name',
        render: (_: string, record: Candidate) =>
          `${record?.firstName} ${record?.lastName}`,
      },
      {
        title: 'GENDER',
        dataIndex: 'gender',
      },
      {
        title: 'MOBILE PHONE',
        dataIndex: 'phoneNumber',
        render: (phone: string, record: Candidate) =>
          `${record?.mobileZone}${phone}`,
      },
      {
        title: 'NATIONALITY',
        dataIndex: 'nation',
      },
      {
        title: '',
        dataIndex: 'actions',
        render: (_: string, record: Candidate) => (
          <div>
            <span className="edit-btn">
              <Button
                onClick={() => handleOnEdit(record?.id)}
                type="primary"
                ghost
              >
                EDIT
              </Button>
            </span>
            <span>
              <Button onClick={() => handleOnDelete(record?.id)} danger>
                DELETE
              </Button>
            </span>
          </div>
        ),
        align: 'right',
      },
    ],
    [handleOnDelete]
  );

  return (
    <CustomTable
      rowSelection={rowSelection}
      rowKey="id"
      columns={columns}
      dataSource={dataSource}
      pagination={{
        pageSize: 1,
        showSizeChanger: false,
      }}
    />
  );
};

const CustomTable = styled(Table)`
  .edit-btn {
    margin-right: 5px;
  }
`;

export default CandidateTable;
