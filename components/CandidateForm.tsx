import moment from 'moment';
import {
  Form,
  Input,
  InputNumber,
  Select,
  Row,
  Col,
  DatePicker,
  Radio,
  Button,
} from 'antd';
import { useEffect } from 'react';

import CandidateFormInterface from 'interfaces/candidate-form.interface';
import MobileZoneEnum from 'enums/mobile.zone.enum';

const { Option } = Select;

const FormLayout = {
  labelCol: { span: 8 },
  wrapperCol: { span: 16 },
};

const tailFormItemLayout = {
  wrapperCol: {
    xs: {
      span: 24,
      offset: 0,
    },
    sm: {
      span: 16,
      offset: 8,
    },
  },
};

type Props = {
  defaultValues?: CandidateFormInterface;
  onFinish: (candidateFormValue: CandidateFormInterface) => void;
  editMode?: boolean;
  triggerDefault?: boolean;
};

const CandidateForm = ({
  defaultValues = { mobileZone: MobileZoneEnum.THAI },
  onFinish,
  editMode = false,
}: Props) => {
  const [form] = Form.useForm();

  const prefixPhone = (
    <Form.Item name="mobileZone" noStyle>
      <Select style={{ width: 70 }}>
        <Option value={MobileZoneEnum.THAI}>+66</Option>
        <Option value={MobileZoneEnum.USA}>+1</Option>
      </Select>
    </Form.Item>
  );

  const handleOnFinish = (candidate: CandidateFormInterface) => {
    let newCandidate = candidate;

    if (candidate.birthDate) {
      newCandidate = {
        ...candidate,
        birthDate: moment(candidate.birthDate).valueOf(),
        salary: candidate?.salary?.replace(/\,/g, ''),
      };
    }

    onFinish(newCandidate);

    if (!editMode) {
      form.resetFields();
    }
  };

  useEffect(() => {
    if (editMode) {
      form.setFieldsValue(defaultValues);
    }
  }, [defaultValues, editMode]);

  return (
    <Form
      {...FormLayout}
      initialValues={defaultValues}
      onFinish={handleOnFinish}
      form={form}
    >
      <Row gutter={[8, 8]}>
        <Col sm={24} lg={12} xl={8}>
          <Form.Item
            name="title"
            label="Title"
            rules={[{ required: true, message: 'Title is required.' }]}
          >
            <Select>
              <Option value="Mr">Mr</Option>
              <Option value="Miss">Miss</Option>
              <Option value="Mrs">Mrs</Option>
              <Option value="Ms">Ms</Option>
            </Select>
          </Form.Item>
        </Col>
        <Col sm={24} lg={12} xl={8}>
          <Form.Item
            name="firstName"
            label="Firstname"
            rules={[
              {
                required: true,
                message: 'Firstname is required.',
              },
              {
                pattern: /^[A-Za-z ]+$/,
                message: 'Firstname must only contains alphabet.',
              },
            ]}
          >
            <Input />
          </Form.Item>
        </Col>
        <Col sm={24} lg={12} xl={8}>
          <Form.Item
            name="lastName"
            label="Lastname"
            rules={[
              { required: true, message: 'Lastname is required.' },
              {
                pattern: /^[A-Za-z ]+$/,
                message: 'Lastname must only contains alphabet.',
              },
            ]}
          >
            <Input />
          </Form.Item>
        </Col>
      </Row>
      <Row gutter={[8, 8]}>
        <Col sm={24} lg={12} xl={8}>
          <Form.Item
            name="birthDate"
            label="Birthday"
            rules={[{ required: true, message: 'Birthday is required.' }]}
          >
            <DatePicker
              style={{ width: '100%' }}
              format="MM/DD/YYYY"
              placeholder="MM/DD/YYYY"
            />
          </Form.Item>
        </Col>
        <Col sm={24} lg={12} xl={8}>
          <Form.Item name="nation" label="Nationality">
            <Select>
              <Option value="THAI">THAI</Option>
              <Option value="USA">USA</Option>
            </Select>
          </Form.Item>
        </Col>
      </Row>
      <Row gutter={[8, 8]}>
        <Col sm={24} lg={12} xl={8}>
          <Form.Item
            name="citizenId"
            label="Citizen ID"
            rules={[
              {
                pattern: /^\d+$/,
                message: 'Citizen ID must contains only number.',
              },
            ]}
          >
            <Input />
          </Form.Item>
        </Col>
      </Row>
      <Row gutter={[8, 8]}>
        <Col sm={24} lg={12} xl={8}>
          <Form.Item name="gender" label="Gender">
            <Radio.Group>
              <Radio value="Male">Male</Radio>
              <Radio value="Female">Female</Radio>
              <Radio value="Unisex">Unisex</Radio>
            </Radio.Group>
          </Form.Item>
        </Col>
      </Row>
      <Row gutter={[8, 8]}>
        <Col sm={24} lg={12} xl={8}>
          <Form.Item
            name="phoneNumber"
            label="Mobile Phone"
            rules={[{ required: true, message: 'Phone Number is required.' }]}
          >
            <Input addonBefore={prefixPhone} />
          </Form.Item>
        </Col>
      </Row>
      <Row gutter={[8, 8]}>
        <Col sm={24} lg={12} xl={8}>
          <Form.Item
            name="passport"
            label="Passport No"
            rules={[
              {
                pattern: /^[a-z0-9]+$/i,
                message:
                  'Passport No must contains only numbers and alphabets.',
              },
            ]}
          >
            <Input />
          </Form.Item>
        </Col>
      </Row>
      <Row gutter={[8, 8]}>
        <Col sm={24} lg={12} xl={8}>
          <Form.Item
            name="salary"
            label="Expected Salary"
            rules={[
              { required: true, message: 'Expected Salary is required.' },
              {
                pattern: /^\d+$/,
                message: 'Expected Salary must only contains number.',
              },
            ]}
          >
            <span>
              <Input style={{ width: '80%' }} />
              <span style={{ marginLeft: 5 }}>THB</span>
            </span>
          </Form.Item>
        </Col>
      </Row>
      <Row gutter={[8, 8]}>
        <Col offset={16} span={8}>
          <Form.Item {...tailFormItemLayout}>
            <Button htmlType="submit" type="primary">
              {editMode ? 'UPDATE' : 'SUBMIT'}
            </Button>
          </Form.Item>
        </Col>
      </Row>
    </Form>
  );
};

export default CandidateForm;
