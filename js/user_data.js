
export function populateData(user) {
    
    return {
        profile: {
            firstName : user.firstName,
            lastName: user.lastName,
            avatar:user.img,
            login : user.login,
            gender : user.gender,
            level : user.level,
        },

        xp: {
            total : user.XP,
            xpPerProject: user.XP_per_project.map(p => ({
                name: p.object.name,
                createdAt: p.createdAt,
                xp: p.amount,
                mandatory:p.object.parents[0].mandatory,
            })).sort(
                (a, b) =>
                    new Date(a.createdAt) -
                    new Date(b.createdAt)
            ),
        },

        audits: {
            ratio : user.auditRatio,
            done : user.totalUp,
            received : user.totalDown,
            bonus : user.totalUpBonus,
        },

        skills: user.skills.map(s => ({
            label: s.type.replace("skill_", ""),
            level:s.amount,
        })).sort(
                (a, b) => b.level - a.level
            ),
    };

}