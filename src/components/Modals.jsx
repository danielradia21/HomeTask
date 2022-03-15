import React from 'react';
import { EditModal } from './editModal';
import { AddModal } from './addModal';

export function Modals({ closeEditModal, userToUpdate, updateMsg }) {
    return (
        <>
            {userToUpdate ? (
                <EditModal
                    updateMsg={updateMsg}
                    closeEditModal={closeEditModal}
                    userToUpdate={userToUpdate}
                />
            ) : (
                <AddModal
                    closeEditModal={closeEditModal}
                    updateMsg={updateMsg}
                />
            )}
        </>
    );
}
