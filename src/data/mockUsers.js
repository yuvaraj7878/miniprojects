export const mockUsers = [
    {
      id: '1',
      name: 'P.Srinivasan',
      email: 'srinivasan@example.com',
      password: 'password123',
      role: 'admin',
      phone: '92132223156',
      businessType: 'admin'
    },
    {
      id: '2',
      name: 'Sakaravarthi Prabhu',
      email: 'prabhu@example.com',
      password: 'password123',
      role: 'admin',
      phone: '92132223131',
      businessType: 'admin'
    },
    {
      id: '3',
      name: 'S.Yuvaraj',
      email: 'yuvaraj@example.com',
      password: 'password123',
      role: 'admin',
      phone: '92132223183',
      businessType: 'admin'
    },
    {
      id: '4',
      name: 'Sounthara Pandiyan',
      email: 'pandiyan@example.com',
      password: 'password123',
      role: 'user',
      phone: '921321205153',
      businessType: 'street_vendor',
      documents: [
        {
          id: 'doc1',
          type: 'identity_proof',
          applicationType: 'street_vendor',
          uploadedAt: '2023-05-01T10:00:00Z',
          status: 'completed',
          verifiedBy: '1'
        },
        {
          id: 'doc2',
          type: 'address_proof',
          applicationType: 'street_vendor',
          uploadedAt: '2023-05-02T11:00:00Z',
          status: 'approved',
          verifiedBy: '2',
          currentAdmin: '3',
          nextAdmin: null
        }
      ]
    },
    {
      id: '5',
      name: 'Test User',
      email: 'test@example.com',
      password: 'password123',
      role: 'user',
      phone: '9876543210',
      businessType: 'small_shop',
      documents: [
        {
          id: 'doc3',
          type: 'identity_proof',
          applicationType: 'small_shop',
          uploadedAt: '2023-05-10T09:00:00Z',
          status: 'pending',
          currentAdmin: '1'
        },
        {
          id: 'doc4',
          type: 'business_proof',
          applicationType: 'small_shop',
          uploadedAt: '2023-05-11T10:00:00Z',
          status: 'pending',
          currentAdmin: '2'
        }
      ]
    }
  ];