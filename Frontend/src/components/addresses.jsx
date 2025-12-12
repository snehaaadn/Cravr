import react from 'react';

function AddressCard({ add }) {
    return (
        <div className='border border-gray-300 rounded-lg p-4 shadow hover:shadow-lg transition-shadow duration-300'>
            <div>
                <div className='flex flex-row justify-between'>
                    <p className='font-bold text-lg'>{add.label}</p>
                    <button
                    onClick={() => onhandleAddNewAddress()}
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-pencil-square hover:text-red-600 cursor-pointer" viewBox="0 0 16 16">
                            <path d="M15.502 1.94a.5.5 0 0 1 0 .706L14.459 3.69l-2-2L13.502.646a.5.5 0 0 1 .707 0l1.293 1.293zm-1.75 2.456-2-2L4.939 9.21a.5.5 0 0 0-.121.196l-.805 2.414a.25.25 0 0 0 .316.316l2.414-.805a.5.5 0 0 0 .196-.12l6.813-6.814z" />
                            <path fill-rule="evenodd" d="M1 13.5A1.5 1.5 0 0 0 2.5 15h11a1.5 1.5 0 0 0 1.5-1.5v-6a.5.5 0 0 0-1 0v6a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5v-11a.5.5 0 0 1 .5-.5H9a.5.5 0 0 0 0-1H2.5A1.5 1.5 0 0 0 1 2.5v11z" />
                        </svg>
                    </button>
                </div>
                <div>
                    <p>
                        {add.house_number}, {add.street}, {add.locality}, {add.city} - {add.pincode}
                    </p>
                    <p>
                        Contact: {add.contact}
                    </p>
                </div>
            </div>
            <div>

            </div>
        </div>
    );
}

function Addresses() {
    const savedAddresses = [
        {
            id: 1,
            label: 'Home',
            house_number: '123',
            street: 'Main St',
            locality: 'Springfield',
            city: 'IL',
            pincode: '62701',
            contact: '9876543210'
        },
        {
            id: 2,
            label: 'Work',
            house_number: '456',
            street: 'Elm St',
            locality: 'Springfield',
            city: 'IL',
            pincode: '62701',
            contact: '8765432109'
        }
    ];

    // onhandleAddNewAddress = () => {
    //     // Logic to add new address
    // }

    return (
        <div className='flex flex-col '>
            <div className='flex flex-col space-y-2 items-start border-b-2 border-gray-300 pb-2 mb-4'>
                <p className='font-mono text-2xl '>Saved Addresses</p>
                <button className='flex flex-row items-center text-orange-600 px-4 py-2 rounded hover:scale-105 transition duration-300 ease-in-out'
                onClick={() => onhandleAddNewAddress()}
                >
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-plus-lg" viewBox="0 0 16 16">
                        <path fill-rule="evenodd" d="M8 2a.5.5 0 0 1 .5.5v5h5a.5.5 0 0 1 0 1h-5v5a.5.5 0 0 1-1 0v-5h-5a.5.5 0 0 1 0-1h5v-5A.5.5 0 0 1 8 2" />
                    </svg>
                    Add New Address
                </button>
            </div>
            <div>

            </div>

            <div className='grid grid-cols-2 gap-2'>
                {savedAddresses.map((add) => (
                    <div key={add.id}>
                        <AddressCard add={add} />
                    </div>
                ))}
            </div>
        </div>
    )
}
export default Addresses;