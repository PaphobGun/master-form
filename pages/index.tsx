import { useState } from 'react';
import { Button, Checkbox } from 'antd';
import styled from 'styled-components';
import { useDispatch, useSelector } from 'react-redux';

import CandidateForm from 'components/CandidateForm';
import EditFormModal from 'components/EditFormModal';
import CandidateTable from 'components/CandidateTable';
import type CandidateFormInterface from 'interfaces/candidate-form.interface';
import { createCandidate, deleteCandidate } from 'store/actions/candidate';
import type Candidate from 'interfaces/candidate.interface';

const Home = () => {
  const dispatch = useDispatch();
  const { candidates } = useSelector((state) => state.candidateReducer);

  const [isOpenEditFormModal, setIsOpenEditFormModal] = useState(false);
  const [selectedId, setSelectedId] = useState(undefined);
  const [selectedRowKeys, setSelectedRowKeys] = useState([]);

  const handleSelect = (record: Candidate, selected: boolean) => {
    if (selected) {
      setSelectedRowKeys((keys) => [...keys, record?.id]);
    } else {
      setSelectedRowKeys((keys) => {
        const index = keys.indexOf(record?.id);
        return [...keys.slice(0, index), ...keys.slice(index + 1)];
      });
    }
  };

  const toggleSelectAll = () => {
    setSelectedRowKeys((keys) =>
      keys.length === candidates.length
        ? []
        : candidates.map((r: Candidate) => r.id)
    );
  };

  const headerCheckbox = (
    <Checkbox
      checked={selectedRowKeys.length > 0}
      indeterminate={
        selectedRowKeys.length > 0 && selectedRowKeys.length < candidates.length
      }
      onChange={toggleSelectAll}
    />
  );

  const rowSelection = {
    selectedRowKeys,
    type: 'checkbox',
    fixed: true,
    onSelect: handleSelect,
    columnTitle: headerCheckbox,
  };

  const handleCreateCandidate = (newCandidate: CandidateFormInterface) => {
    dispatch(createCandidate(newCandidate));
  };

  const handleOnClickEdit = (id: string) => {
    setSelectedId(id);
    setIsOpenEditFormModal(true);
  };

  const handleOnCloseEditFormModal = () => {
    setIsOpenEditFormModal(false);
    setSelectedId(undefined);
  };

  const handleOnClickDeleteButton = () => {
    dispatch(deleteCandidate(selectedRowKeys));
  };

  return (
    <Wrapper>
      <div className="form-wrapper">
        <CandidateForm onFinish={handleCreateCandidate} />
      </div>
      <div className="action">
        <Button
          disabled={selectedRowKeys.length <= 0}
          onClick={handleOnClickDeleteButton}
          danger
          type="primary"
        >
          DELETE
        </Button>
      </div>
      <div className="table-wrapper">
        <CandidateTable
          rowSelection={rowSelection}
          dataSource={candidates}
          onEdit={handleOnClickEdit}
        />
      </div>
      <EditFormModal
        open={isOpenEditFormModal}
        onCancel={handleOnCloseEditFormModal}
        id={selectedId}
      />
    </Wrapper>
  );
};

const Wrapper = styled.div`
  padding: 50px 240px;

  .form-wrapper {
    background-color: #fbfbfb;
    padding: 30px 20px;
    box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2);
    transition: 0.3s;
  }

  .form-wrapper:hover {
    box-shadow: 0 8px 16px 0 rgba(0, 0, 0, 0.2);
  }

  .action {
    margin-top: 60px;
  }

  .table-wrapper {
    margin-top: 20px;
  }

  @media only screen and (max-width: 1600px) {
    padding: 40px 100px;
  }

  @media only screen and (max-width: 1400px) {
    padding: 40px 50px;
  }
`;

export default Home;
