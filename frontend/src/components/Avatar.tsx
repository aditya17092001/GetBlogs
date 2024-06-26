export const Avatar = ({ name, size = 'small' }: { name: String, size: 'small' | 'big' }) => {
    return (
        <div className={`relative inline-flex items-center justify-center overflow-hidden bg-gray-600 rounded-full ${size === 'small' ? 'w-7 h-7' : 'w-10 h-10'}`}>
            <span className="font-medium text-gray-600 dark:text-gray-300">{name[0].toUpperCase()}</span>
        </div>
    )
}