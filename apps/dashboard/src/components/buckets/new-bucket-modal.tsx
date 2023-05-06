import { Field, Form, Formik } from 'formik';
import bucketLocations from 'lib/constants/bucket-locations';
import bucketStorageClasses from 'lib/constants/bucket-storage-classes';
import React from 'react';
import { mutate } from 'swr';
import Button from 'ui/components/button';
import Input from 'ui/components/form/input';
import Label from 'ui/components/form/label';
import Select from 'ui/components/form/select';
import Modal from 'ui/components/modal';
import * as Yup from 'yup';
import { createBucket } from '../../services/buckets';

interface NewBucketModalProps extends React.HTMLAttributes<HTMLDivElement> {
  open: boolean;
  onClose: () => void;
}

export default function NewBucketModal({ open, onClose }: NewBucketModalProps) {
  const handleSubmit = React.useCallback(
    async (values, actions) => {
      await createBucket(values)
        .then(() => mutate((key) => key[0] === '/api/v1/buckets'))
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
          location: 'us-west2',
          storage_class: 'standard',
        }}
        onSubmit={handleSubmit}
        validationSchema={Yup.object().shape({
          name: Yup.string().required(),
          location: Yup.string().required(),
          storage_class: Yup.string().required(),
          settings: Yup.object().shape({
            allowed_file_types: Yup.string(),
          }),
        })}
      >
        {({ isSubmitting, isValid, dirty }) => (
          <Form>
            <Modal.Header>
              <Modal.Title>New bucket</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <div className="space-y-4">
                <div>
                  <Label for="name">Bucket name</Label>
                  <Field as={Input} name="name" placeholder="bucket-123" />
                </div>
                <div>
                  <Label for="storage_class">Storage class</Label>
                  <Field as={Select} name="storage_class">
                    {bucketStorageClasses.map((storageClass) => (
                      <option key={storageClass} value={storageClass}>
                        {storageClass[0].toUpperCase() + storageClass.slice(1)}
                      </option>
                    ))}
                  </Field>
                </div>
                <div>
                  <Label for="location">Location</Label>
                  <Field as={Select} name="location">
                    {bucketLocations.map((location) => (
                      <option key={location.name} value={location.name}>
                        {location.name} ({location.description})
                      </option>
                    ))}
                  </Field>
                </div>
                <div>
                  <Label for="settings.allowed_file_types" optional>
                    Allowed file types
                  </Label>
                  <Field
                    as={Input}
                    name="settings.allowed_file_types"
                    placeholder="image/jpeg, video/mp4, application/pdf"
                  />
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
