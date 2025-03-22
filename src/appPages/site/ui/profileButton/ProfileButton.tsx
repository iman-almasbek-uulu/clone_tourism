import { FC, memo } from 'react';
import scss from './ProfileButton.module.scss';
import { IconChevronUp } from '@tabler/icons-react';
import { Avatar } from 'antd';

interface ProfileButtonProps {
	isOpen: boolean;
	setIsOpen: (isOpen: boolean) => void;
	user: User | null;
}

const ProfileButton: FC<ProfileButtonProps> = ({ isOpen, setIsOpen, user }) => {
	return (
		<>
			<button
				className={scss.ProfileButton}
				onClick={(e) => {
					e.stopPropagation();
					setIsOpen(!isOpen);
				}}
			>
				<Avatar size={38} icon={<img src={user?.photo} alt="avatar" />} />
				<p className={scss.name}>{user?.userName}</p>
				<IconChevronUp
					className={isOpen ? `${scss.arrow} ${scss.active}` : `${scss.arrow}`}
					stroke={2.5}
				/>
			</button>
		</>
	);
};
export default memo(ProfileButton);
