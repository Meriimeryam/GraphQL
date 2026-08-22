
export function populateData(user) {
    return {
        profile: {
            firstName : user.firstName,
            lastName : user.lastName,
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
            })),
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
        })),
    };

}