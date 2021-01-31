import moment from 'moment';
import { useMemo } from 'react';
import styled from 'styled-components';
import { Modal, Divider } from 'antd';
import { useDispatch, useSelector } from 'react-redux';

import CandidateForm from 'components/CandidateForm';
import CandidateFormInterface from 'interfaces/candidate-form.interface';
import { updateCandidate } from 'store/actions/candidate';

type Props = {
  id: string;
  open: boolean;
  onCancel: () => void;
};

const EditFormModal = ({ open, onCancel, id }: Props) => {
  const { candidates } = useSelector((state) => state.candidateReducer);
  const dispatch = useDispatch();

  const handleUpdateForm = (formValues: CandidateFormInterface) => {
    dispatch(updateCandidate(id, { ...formValues, id }));
    onCancel();
  };

  const defaultValues = useMemo(() => {
    const targetCan = candidates?.find(({ id: canId }) => canId === id);
    return {
      ...targetCan,
      birthDate:
        (targetCan?.birthDate && moment(targetCan?.birthDate)) || undefined,
    };
  }, [id, candidates]);

  return (
    <ModalWrapper
      visible={open}
      maskClosable
      closable={false}
      footer={null}
      onCancel={onCancel}
    >
      <div className="title">Edit for candidate ID: {id}</div>
      <Divider />
      <CandidateForm
        defaultValues={defaultValues}
        onFinish={handleUpdateForm}
        editMode
      />
    </ModalWrapper>
  );
};

const ModalWrapper = styled(Modal)`
  width: 1200px !important;
`;

export default EditFormModal;
