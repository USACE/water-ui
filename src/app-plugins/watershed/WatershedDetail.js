import React from 'react';
import { connect } from 'redux-bundler-react';
import SearchItemWatershed from './SearchItemWatershed';
import { Wrapper } from '../../app-components/detail-panel';
import { PencilAltIcon } from '@heroicons/react/outline';
import EditModal from './EditModal';
import RoleFilter from '../../app-components/role-filter';
import { includeIfTrue } from '../../utils';

const EditButton = connect('doModalOpen', ({ doModalOpen }) => {
  return (
    <button
      className=""
      onClick={(e) => {
        doModalOpen(EditModal);
      }}
    >
      <PencilAltIcon
        className="w-6 h-6 text-gray-200 hover:text-white"
        aria-hidden="true"
      />
    </button>
  );
});

const WatershedDetail = connect(
  'selectWatershedDetailSelected',
  ({ watershedDetailSelected: detail }) => {
    return !detail ? null : (
      <Wrapper>
        <Wrapper.Title>
          <div className="flex-grow">
            <SearchItemWatershed
              uid={detail.slug}
              name={detail.name}
              clickable={false}
              provider="Watershed"
            />
          </div>
          <RoleFilter
            showForRoles={includeIfTrue(
              'APPLICATION.ADMIN',
              detail && detail.slug && `${detail.slug.toUpperCase()}.ADMIN`, // e.g. SCIOTO-RIVER.ADMIN
              detail &&
                detail.office_symbol &&
                `${detail.office_symbol.toUpperCase()}.ADMIN` // e.g. LRH.ADMIN
            )}
          >
            <EditButton />
          </RoleFilter>
        </Wrapper.Title>
        <Wrapper.Image
          src={detail.image || `${process.env.PUBLIC_URL}/watershed.jpg`}
          alt="Selected Watershed"
        />
      </Wrapper>
    );
  }
);

export default WatershedDetail;
