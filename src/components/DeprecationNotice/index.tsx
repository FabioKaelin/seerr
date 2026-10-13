import Button from '@app/components/Common/Button';
import Modal from '@app/components/Common/Modal';
import globalMessages from '@app/i18n/globalMessages';
import defineMessages from '@app/utils/defineMessages';
import { Transition } from '@headlessui/react';
import { ArrowTopRightOnSquareIcon } from '@heroicons/react/24/outline';
import { Fragment, useEffect, useState } from 'react';
import { useIntl } from 'react-intl';

const messages = defineMessages('components.DeprecationNotice', {
  title: 'Jellyseerr is deprecated',
  description:
    'Jellyseerr was deprecated on {date} with the release of Seerr, the upgrade to Jellyseerr. It is no longer maintained and no longer receives bug fixes or security updates. Jellyfin login will fail on newer Jellyfin versions because Jellyseerr uses a deprecated authentication method. Please upgrade to Seerr.',
  migrationGuide: 'Migration Guide',
});

const MIGRATION_DOCS_URL = 'https://docs.seerr.dev/migration-guide/';
const STORAGE_KEY = 'deprecation-notice-dismissed';
const SEERR_RELEASE_DATE = new Date('2026-02-14T00:00:00Z');

const DeprecationNotice = () => {
  const intl = useIntl();
  const [isDismissed, setIsDismissed] = useState(true);

  useEffect(() => {
    setIsDismissed(window.localStorage.getItem(STORAGE_KEY) === 'true');
  }, []);

  const dismiss = () => {
    window.localStorage.setItem(STORAGE_KEY, 'true');
    setIsDismissed(true);
  };

  return (
    <Transition
      as={Fragment}
      enter="transition-opacity duration-300"
      enterFrom="opacity-0"
      enterTo="opacity-100"
      leave="transition-opacity duration-300"
      leaveFrom="opacity-100"
      leaveTo="opacity-0"
      appear
      show={!isDismissed}
    >
      <Modal
        title={intl.formatMessage(messages.title)}
        onCancel={dismiss}
        cancelText={intl.formatMessage(globalMessages.close)}
        backgroundClickable={false}
      >
        <p>
          {intl.formatMessage(messages.description, {
            date: intl.formatDate(SEERR_RELEASE_DATE, {
              year: 'numeric',
              month: 'long',
              day: 'numeric',
              timeZone: 'UTC',
            }),
          })}
        </p>
        <div className="mt-4 flex justify-center">
          <Button
            as="a"
            buttonType="primary"
            href={MIGRATION_DOCS_URL}
            target="_blank"
            rel="noopener noreferrer"
          >
            <ArrowTopRightOnSquareIcon />
            <span>{intl.formatMessage(messages.migrationGuide)}</span>
          </Button>
        </div>
      </Modal>
    </Transition>
  );
};

export default DeprecationNotice;
