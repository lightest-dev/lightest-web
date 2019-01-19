export class Group {
  id: string;
  name: string;
  parent: {
    id: string;
    name: string;
    public: boolean;
    parentId: string;
  };
  subGroups: [
    {
      id: string;
      name: string;
      public: boolean;
      parentId: string;
    }
  ];
  users: [
    {
      canChangeAccess: boolean;
      canRead: boolean;
      canWrite: boolean;
      id: string;
      isOwner: boolean;
      userName: string;
    }
  ];
}
