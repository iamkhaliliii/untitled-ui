import { cx } from "@/utils/cx";

export interface Member {
    id: string;
    name: string;
    username: string;
    email: string;
    seatUsageNote?: string;
    avatar?: {
        type: 'image' | 'initials' | 'logo' | 'flag';
        src?: string;
        text?: string;
        bgColor?: string;
        textColor?: string;
    };
}

interface MembersTableProps {
    members?: Member[];
    onMemberSelect?: (memberId: string, selected: boolean) => void;
    onSelectAll?: (selected: boolean) => void;
    selectedMembers?: string[];
}

// Sample data matching the screenshot exactly
const defaultMembers: Member[] = [
    {
        id: "1",
        name: "78Win science",
        username: "Hf1iKLzcFvJG",
        email: "phanlinh6757j@gmail.com",
        avatar: {
            type: 'logo',
            text: '78Win',
            bgColor: 'bg-blue-600',
            textColor: 'text-white'
        }
    },
    {
        id: "2", 
        name: "slot thailand",
        username: "BVkxRJYfyiyO",
        email: "slotthailand194@gmail.com",
        avatar: {
            type: 'logo',
            text: '—',
            bgColor: 'bg-orange-600',
            textColor: 'text-white'
        }
    },
    {
        id: "3",
        name: "dougelkinschoreography...",
        username: "Eud5AdexgoA9", 
        email: "phyreogra@gmail.com",
        avatar: {
            type: 'logo',
            text: 'MR',
            bgColor: 'bg-blue-600',
            textColor: 'text-white'
        }
    },
    {
        id: "4",
        name: "Misa",
        username: "h6e7iSeR1bjw",
        email: "itsmisa14@gmail.com",
        avatar: {
            type: 'initials',
            text: 'M',
            bgColor: 'bg-amber-100',
            textColor: 'text-amber-800'
        }
    },
    {
        id: "5",
        name: "Maxime Moffront",
        username: "lSVkpJfMDHgd",
        email: "max.moffront@gmail.com",
        avatar: {
            type: 'initials',
            text: 'M',
            bgColor: 'bg-slate-100',
            textColor: 'text-slate-800'
        }
    },
    {
        id: "6",
        name: "Lô Đê Xanh Chin",
        username: "o2F9xXs7cF24",
        email: "goluhili43539@gmail.com",
        avatar: {
            type: 'flag',
            text: '🇻🇳',
            bgColor: 'bg-red-500',
            textColor: 'text-white'
        }
    },
    {
        id: "7",
        name: "Thebk8com",
        username: "HquuZYlYXh92",
        email: "dov15430@gmail.com",
        avatar: {
            type: 'logo',
            text: '●',
            bgColor: 'bg-gray-800',
            textColor: 'text-white'
        }
    },
    {
        id: "8",
        name: "Nathan",
        username: "rtRBBJwZqriM",
        email: "nathan.lu12@outlook.com",
        avatar: {
            type: 'initials',
            text: 'N',
            bgColor: 'bg-yellow-100',
            textColor: 'text-yellow-800'
        }
    }
];

export const MembersTable = ({ 
    members = defaultMembers,
    onMemberSelect,
    onSelectAll,
    selectedMembers = []
}: MembersTableProps) => {
    const renderAvatar = (member: Member) => {
        if (!member.avatar) return null;

        const { avatar } = member;
        
        return (
            <div className={cx(
                "h-8 w-8 rounded-full flex items-center justify-center flex-shrink-0",
                avatar.bgColor
            )}>
                <span className={cx("text-xs font-medium", avatar.textColor)}>
                    {avatar.text}
                </span>
            </div>
        );
    };

    return (
        <div className="flex-1 bg-white overflow-hidden">
            <div className="overflow-x-auto">
                <table className="w-full">
                    <thead className="bg-gray-50 border-b border-gray-200">
                        <tr>
                            <th className="px-6 py-3 text-left w-12">
                                <input
                                    type="checkbox"
                                    className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                                    onChange={(e) => onSelectAll?.(e.target.checked)}
                                    checked={selectedMembers.length === members.length}
                                />
                            </th>
                            <th className="px-6 py-3 text-left">
                                <div className="flex items-center space-x-1">
                                    <span className="w-6 h-6 flex items-center justify-center">
                                        <div className="w-4 h-4 border-2 border-gray-300 rounded"></div>
                                    </span>
                                </div>
                            </th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                Name
                            </th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                Username
                            </th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                Email
                            </th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                Seat usage note
                            </th>
                        </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                        {members.map((member) => {
                            const isSelected = selectedMembers.includes(member.id);
                            
                            return (
                                <tr 
                                    key={member.id} 
                                    className="hover:bg-gray-50 transition-colors"
                                >
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <input
                                            type="checkbox"
                                            className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                                            checked={isSelected}
                                            onChange={(e) => onMemberSelect?.(member.id, e.target.checked)}
                                        />
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        {renderAvatar(member)}
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <div className="text-sm font-medium text-gray-900">
                                            {member.name}
                                        </div>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <div className="text-sm font-medium text-green-600">
                                            {member.username}
                                        </div>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <div className="text-sm text-gray-900">
                                            {member.email}
                                        </div>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <div className="text-sm text-gray-500">
                                            {member.seatUsageNote || ''}
                                        </div>
                                    </td>
                                </tr>
                            );
                        })}
                    </tbody>
                </table>
            </div>
        </div>
    );
};
