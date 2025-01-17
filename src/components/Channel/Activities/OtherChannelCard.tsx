import getProfilePicture from '@utils/functions/getProfilePicture'
import dynamic from 'next/dynamic'
import Link from 'next/link'
import React from 'react'
import { Profile } from 'src/types'
const SubscribeActions = dynamic(() => import('../../Common/SubscribeActions'))

const OtherChannelCard = ({ channel }: { channel: Profile }) => {
  const subscribeType = channel?.followModule?.__typename

  return (
    <div className="flex flex-col items-center justify-center w-40 py-3 border border-gray-200 rounded-xl dark:border-gray-900">
      <Link href={`/${channel.handle}`}>
        <a>
          <img
            className="object-cover w-24 h-24 rounded-full"
            src={getProfilePicture(channel)}
            alt="channel picture"
            draggable={false}
          />
        </a>
      </Link>
      <div className="w-full px-1.5 py-2">
        <div className="flex-1 text-center">
          <Link href={`/${channel.handle}`}>
            <a className="block font-medium truncate">{channel.handle}</a>
          </Link>
        </div>
        <div className="text-xs text-center opacity-70">
          {channel.stats.totalFollowers} subscribers
        </div>
      </div>
      <SubscribeActions channel={channel} subscribeType={subscribeType} />
    </div>
  )
}

export default OtherChannelCard
