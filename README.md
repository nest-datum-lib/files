# @nest-datum-lib/files
## File manager.

controller
jwt
model
	sql
		primary  // with createdAt, updatedAt isDeleted, isNotDeleted, name ...
			fuse
				setting
				status
				main
				bind
				many
					option
					access // from many
	disk
		local
		cloud
	redis
		app // insted of replica
			transport
		cache
	task
		queue
		cron
