const ProfileIcon = ({color, onClick}) => {
    return (
        <svg fill={color} height="35" viewBox="0 0 32 32" width="35" xmlns="http://www.w3.org/2000/svg" onClick={onClick}><path d="m25 3h-18c-.53043 0-1.03914.21071-1.41421.58579-.37508.37507-.58579.88378-.58579 1.41421v22c0 .5304.21071 1.0391.58579 1.4142.37507.3751.88378.5858 1.41421.5858h18c.5304 0 1.0391-.2107 1.4142-.5858s.5858-.8838.5858-1.4142v-22c0-.53043-.2107-1.03914-.5858-1.41421-.3751-.37508-.8838-.58579-1.4142-.58579zm-13 3h8c.2652 0 .5196.10536.7071.29289.1875.18754.2929.44189.2929.70711s-.1054.51957-.2929.70711c-.1875.18753-.4419.29289-.7071.29289h-8c-.2652 0-.5196-.10536-.7071-.29289-.1875-.18754-.2929-.44189-.2929-.70711s.1054-.51957.2929-.70711c.1875-.18753.4419-.29289.7071-.29289zm10.6 18.8c-.2133.1559-.4791.2223-.7407.1849-.2616-.0373-.4982-.1755-.6593-.3849-.6055-.8073-1.3906-1.4625-2.2931-1.9138-.9026-.4513-1.8978-.6862-2.9069-.6862s-2.0043.2349-2.9069.6862c-.9025.4513-1.6876 1.1065-2.2931 1.9138-.0931.1242-.2139.225-.3528.2944-.1388.0695-.292.1056-.4472.1056-.21682.0028-.42824-.0677-.6-.2-.21217-.1591-.35244-.396-.38995-.6586-.03751-.2625.03082-.5292.18995-.7414.885-1.188 2.0659-2.1232 3.425-2.7125-.7436-.6803-1.2643-1.5694-1.4937-2.5508s-.157-2.0092.2079-2.9486c.3649-.9395 1.0052-1.7467 1.8369-2.3159.8318-.5692 1.8161-.8738 2.8239-.8738s1.9921.3046 2.8239.8738c.8317.5692 1.472 1.3764 1.8369 2.3159.3649.9394.4373 1.9672.2079 2.9486s-.7501 1.8705-1.4937 2.5508c1.3591.5893 2.54 1.5245 3.425 2.7125.0788.1051.1361.2246.1687.3518s.0398.2596.0213.3896c-.0186.13-.0626.2551-.1295.3681s-.1554.2117-.2605.2905zm-3.6-7.8c0 .5933-.1759 1.1734-.5056 1.6667-.3296.4934-.7982.8779-1.3463 1.1049-.5482.2271-1.1514.2865-1.7334.1708-.5819-.1158-1.1165-.4015-1.536-.8211-.4196-.4195-.7053-.9541-.8211-1.536-.1157-.582-.0563-1.1852.1708-1.7334.227-.5481.6115-1.0167 1.1049-1.3463.4933-.3297 1.0734-.5056 1.6667-.5056.7946.0033 1.5558.3204 2.1177.8823s.879 1.3231.8823 2.1177z"/></svg>
    )
    
}
export default ProfileIcon;