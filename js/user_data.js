
export function populateData(user) {
    if (!user) {
        return {
            profile: { firstName: "", lastName: "", avatar: "", login: "", gender: "", email: "", level: 0 },
            xp: { total: 0, xpPerProject: [] },
            audits: { ratio: 0, done: 0, received: 0, bonus: 0 },
            skills: []
        };
    }

    return {
        profile: {
            firstName : user.firstName?? "Guest",
            lastName: user.lastName ?? "",
            avatar:user.img?? "",
            login : user.login?? "----",
            gender: user.gender?? "",
            email: user.email?? "",
            level : user.level?.[0]?.amount??0,
        },

        xp: {
            total : user.XP?.aggregate?.sum?.amount ?? 0,
            xpPerProject: (user.XP_per_project??[]).map(p => ({
                name: p?.object?.name ?? "Unknown Project",
                createdAt: p?.createdAt ?? new Date().toISOString(),
                xp: p?.amount ?? 0,
                mandatory:p?.object?.parents?.[0]?.mandatory ?? false,
            })).sort(
                (a, b) =>
                    new Date(a.createdAt) -
                    new Date(b.createdAt)
            ),
        },

        audits: {
            ratio : user.auditRatio ?? 0,
            done : user.totalUp ?? 0,
            received : user.totalDown ?? 0,
            bonus : user.totalUpBonus ?? 0,
        },

        skills: (user.skills ?? []).map(s => ({
            label: s?.type? s.type.replace("skill_", ""): "unknown",
            level:s?.amount ?? 0,
        })).sort(
                (a, b) => b.level - a.level
            ),
    };

}