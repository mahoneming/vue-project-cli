import enLocale from 'element-ui/lib/locale/lang/en';
import common from './common';
import btn from './btn';
import toast from './toast';
import user from './user';
import role from './role';
import home from './home';
import feedback from './feedback';
import dashboard from './dashboard';

export default {
	m: {
		...home,
		...common,
		...btn,
		...toast,
		...role,
		...feedback,
		...user,
		...dashboard,
	},
	...enLocale,
};
