import { Field, Form, Formik } from 'formik';
import React from 'react';
import { mutate } from 'swr';
import Button from 'ui/components/button';
import Input from 'ui/components/form/input';
import Label from 'ui/components/form/label';
import Select from 'ui/components/form/select';
import Modal from 'ui/components/modal';
import * as Yup from 'yup';
import { createApiKey } from '../../services/api-keys';

interface NewApiKeyModalProps extends React.HTMLAttributes<HTMLDivElement> {
  open: boolean;
  onClose: () => void;
}

export default function NewApiKeyModal({ open, onClose }: NewApiKeyModalProps) {
  const handleSubmit = React.useCallback(
    async (values, actions) => {
      await createApiKey(values)
        .then(() => mutate((key) => key[0] === '/ajax/apikeys'))
        .then(() => actions.setSubmitting(false))
        .then(onClose);
    },
    [onClose]
  );

  return (
    <Modal open={open} onClose={onClose}>
      <Formik
        initialValues={{
          name: '',
          type: 'publishable',
        }}
        onSubmit={handleSubmit}
        validationSchema={Yup.object().shape({
          name: Yup.string().required(),
          type: Yup.string().required(),
        })}
      >
        {({ isSubmitting, isValid, dirty }) => (
          <Form>
            <Modal.Header>
              <Modal.Title>New API key</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <div className="space-y-4">
                <div>
                  <Label for="name">Name</Label>
                  <Field as={Input} name="name" placeholder="My API key" />
                </div>
                <div>
                  <Label for="type">Type</Label>
                  <Field as={Select} name="type">
                    <option value="publishable">Publishable</option>
                    <option value="secret">Secret</option>
                  </Field>
                </div>
              </div>
            </Modal.Body>
            <Modal.Actions>
              <Button onClick={onClose}>Cancel</Button>
              <Button
                type="submit"
                loading={isSubmitting}
                variant="primary"
                disabled={!isValid || !dirty}
              >
                Save
              </Button>
            </Modal.Actions>
          </Form>
        )}
      </Formik>
    </Modal>
  );
}
