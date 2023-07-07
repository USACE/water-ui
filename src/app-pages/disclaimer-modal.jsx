import { useConnect } from 'redux-bundler-hook';
import AcknowledgeModal from '../app-components/modals/acknowledge-modal';
import { PiWarningCircleBold } from 'react-icons/pi';

export default function DisclaimereModal({ show }) {
  const { doModalClose, doDisclaimerAcknowledge } = useConnect(
    'doModalClose',
    'doDisclaimerAcknowledge'
  );
  if (!show) {
    // console.log('not showing the disclaimer');
    return;
  }

  const handleSubmit = () => {
    doDisclaimerAcknowledge();
    doModalClose();
  };
  const content = (
    <div className='overflow-auto pt-4 text-left text-sm'>
      <p>You must agree to the following terms to continue to the site.</p>
      <p className='mt-4'>
        You are accessing a U.S. Government (USG) Information System (IS) that
        is provided for USG-authorized use only. By using this IS (which
        includes any device attached to this IS), you consent to the following
        conditions:
      </p>
      <ul className='ml-4 mt-4 list-outside list-disc'>
        <li>
          The USG routinely intercepts and monitors communications on this IS
          for purposes including, but not limited to, penetration testing,
          COMSEC monitoring, network operations and defense, personnel
          misconduct (PM), law enforcement (LE), and counterintelligence (CI)
          investigations.
        </li>
        <li>
          At any time, the USG may inspect and seize data stored on this IS.
        </li>
        <li>
          Communications using, or data stored on, this IS are not private, are
          subject to routine monitoring, interception, and search, and may be
          disclosed or used for any USG-authorized purpose.
        </li>
        <li>
          This IS includes security measures (e.g., authentication and access
          controls) to protect USG interests--not for your personal benefit or
          privacy.
        </li>
      </ul>
      <p className='mt-4'>
        Notwithstanding the above, using this IS does not constitute consent to
        PM, LE or CI investigative searching or monitoring of the content of
        privileged communications, or work product, related to personal
        representation or services by attorneys, psychotherapists, or clergy,
        and their assistants. Such communications and work product are private
        and confidential. See User Agreement for details.
      </p>
    </div>
  );

  return (
    <AcknowledgeModal
      title='Disclaimer'
      content={content}
      buttonText='Agree'
      icon={<PiWarningCircleBold className='h-8 w-8 text-gray-600' />}
      onSubmit={handleSubmit}
    />
  );
}
