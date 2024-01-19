import {
  Button,
  Input,
  Link,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
} from '@nextui-org/react';

import { LockKeyholeIcon, MailIcon } from 'lucide-react';

const SignupForm = ({ isOpen, onOpenChange, openLoginModal }) => {
  return (
    <Modal isOpen={isOpen} onOpenChange={onOpenChange} placement='center'>
      <ModalContent>
        {(onClose) => (
          <>
            <ModalHeader className='flex flex-col gap-1'>Signup</ModalHeader>
            <ModalBody>
              <div className='flex gap-2'>
                <Input
                  autoFocus
                  isRequired
                  type='text'
                  label='First Name'
                  placeholder='Enter your first name'
                  variant='bordered'
                />
                <Input
                  isRequired
                  type='text'
                  label='Last Name'
                  placeholder='Enter your last name'
                  variant='bordered'
                />
              </div>
              <Input
                endContent={
                  <MailIcon className='text-2xl text-default-400 pointer-events-none flex-shrink-0' />
                }
                label='Email'
                placeholder='Enter your email'
                variant='bordered'
              />
              <Input
                endContent={
                  <LockKeyholeIcon className='text-2xl text-default-400 pointer-events-none flex-shrink-0' />
                }
                label='Password'
                placeholder='Enter your password'
                type='password'
                variant='bordered'
              />
            </ModalBody>
            <ModalFooter className='flex justify-between'>
              <Link color='primary' onClick={openLoginModal} size='sm' className='cursor-pointer'>
                Already have an account? Log in
              </Link>
              <Button color='primary' onPress={onClose}>
                Submit
              </Button>
            </ModalFooter>
          </>
        )}
      </ModalContent>
    </Modal>
  );
};

export default SignupForm;
