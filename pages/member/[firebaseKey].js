/* eslint-disable @next/next/no-img-element */
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import { getMemberDetails } from '../../api/memberData';

export default function ViewMember() {
  // TODO: Set a state for member
  const [memberDetails, setMemberDetails] = useState({});

  // TODO: Call Router Hook
  const router = useRouter();

  // TODO: grab firebaseKey from url
  const { firebaseKey } = router.query;

  // TODO: make call to API layer to get the data
  useEffect(() => {
    getMemberDetails(firebaseKey).then(setMemberDetails);
  }, [firebaseKey]);

  return (
    <>
      <div className="mt-5 d-flex flex-wrap">
        <div className="d-flex flex-column">
          <img src={memberDetails.image} alt={memberDetails.name} style={{ width: '300px' }} />
        </div>
        <div className="text-white ms-5 details">
          Team Member Name: <a href={`mailto:${memberDetails.authorObject?.name}`}>{memberDetails.authorObject?.name}</a>
          <p>{memberDetails.role || ''}</p>
          <br />
        </div>
        <br />
      </div>
    </>
  );
}
