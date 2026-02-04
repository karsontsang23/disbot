import { User, Message, Channel, Server } from './types';

export const CURRENT_USER: User = {
  id: 'u1',
  name: 'Alex Rivera',
  discriminator: '#4482',
  avatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCPmmY5mCV93IYS8eIWmomgP4PBnlubx0DENOsQNBEvKajUe2S2vHWNxDq4KEDiRAYImbxVj1j0ok8yM5vgqatJYwdcp6BpBLLuCIsbchBuH7sKOrv8UW6rQYwqnYuHZaXN_kEKoepM2h8SXIo7QugFyZ4l7G04MihpHkPwbTmYNOCLnX0_CBZ4xGLc7L0WIDLC6w_WU1GelCzYTaOKw-S3WtL60-fb3s25N3TxWMmhd7QI1lHa28PMk37GqSm3qzXJmSii2vsJ_hWE',
  status: 'online'
};

export const AI_BOT: User = {
  id: 'ai_bot',
  name: 'Creative Assistant',
  isBot: true,
  avatar: 'smart_toy', // Using icon name for simplicity in rendering logic
  status: 'online'
};

export const MOCK_USERS: User[] = [
  CURRENT_USER,
  {
    id: 'u2',
    name: 'Sam Creative',
    avatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCIfkyEAY5vueCqUB24YTPJIP8L_O9gwcrWLIfapVhbPkuTE6DGY1o2z3nqOqKu1eaJMW6bkOF9SEEP-jvceOkLcLSLtB7ku8B1Sn_mmbw3rIL8ls3Eup1gys1Jqd4FcgSb7gis_bSTyU_xarUCoXYW20o63LpNKByLqiKZ6POXBLsvFAbVndS7H2BMRFZ8GKIg84Qg7WlN-aF1cXz537hdIj57j-sDg2SO-CVpKZjVvUb3W1EUPU_rasL4AHsr0OHW1UmX1y_R-Ei6',
    status: 'online'
  },
  {
    id: 'u3',
    name: 'DevMike',
    avatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBNNsiRdw-rkchL_SKPzZFoV0laE7-Z2OPVjrA07H5_e0sMCVexmmPKoR1OHBqspwpof4fqywmvLjoQQCBH4HknjVSSRsbRJmSDFV0F_SPfWrPAzhv0q9FHj5vdDseBljYzCCtYKbTVlqFMibgb27y_CBIyl59apveCs82a6D1cihaHEDJV4fLTHObBhmbnOJD6AdloCdLuf-F88LsKXWYLmCGO5uSZib4xyumOYJKuB_IseBHK3f09_XnHavQWwX-9tn_Xpxa3eM9d',
    status: 'online'
  },
  {
    id: 'u4',
    name: 'Designer Sarah',
    avatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuB79Gl3jdUAZ7zUIyXCKKWirUZ08r-EY3ABMhxgqcpO2Yh-USfrDPzkOuE5a6DhsgoNocV8eozJBDrbeGUZX6lrUYPBa6stKPdTT3yj6PYiqraFm-DEL-xEyAm87dr8K6EJ6ArFXnE-EelWq-jLKIL4nRnBMQmlHztgOkYhwnIGhytSlJTZaeWEfWyGVsCNZt0AR090NMW9_XXcIJCI6gxI58yfdgDaf3KRyryXItXPFjeB7vBg68hp-nHhDvwKXLqTgOEF9gj1ctqJ',
    status: 'online'
  },
  {
    id: 'u5',
    name: 'John Doe',
    avatar: '', // Fallback
    status: 'offline'
  }
];

export const INITIAL_MESSAGES: Message[] = [
  {
    id: 'm1',
    sender: MOCK_USERS[1], // Sam
    content: "Hey everyone! Has anyone seen the new design system updates?",
    timestamp: "10:42 AM",
    reactions: []
  },
  {
    id: 'm2',
    sender: AI_BOT,
    content: "Yes! I just uploaded them to the #resources channel. Check out the latest Figma file.",
    timestamp: "10:45 AM",
    isAi: true,
    attachments: [
      {
        type: 'image',
        title: 'Design Assets 2024',
        description: 'Updated typography and color tokens for the main dashboard view. Includes dark mode variants.',
        url: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCKnV4AYqOCikhx2CIMJ29IXzMtZjQc80NMMU7oRG63W5I1xjjmA9dCVsN1fEvThgoTFZVt6__lhUjiuqYA200aqlXN6tm0inlevcj5W6776W-G3gcBZaYQWdTD5LZdCHvl6yoNzbRtWqrNUlHD74E7QzNE7jEZ9LrOoDs2WNrOUW7JLr2AgjoSe7cRtdiScpEKa50wEWQ87Pk0YsEd3DiS53jlMBNs2nrqdoUh1oJ7VDrgjdN_yRuXy4CkW6n1GlvTsMVo3bgYzVlK'
      }
    ]
  },
  {
    id: 'm3',
    sender: MOCK_USERS[2], // DevMike
    content: "Looks great, starting to implement the CSS vars now. 🔥",
    timestamp: "11:12 AM",
    reactions: [
      { emoji: '👍', count: 2, me: true },
      { emoji: '🚀', count: 5, me: false }
    ]
  }
];

export const SERVERS: Server[] = [
  { id: 's1', name: 'Home', icon: 'auto_awesome', active: false }, // Special home icon
  { id: 's2', name: 'Design Hub', icon: 'hub', active: true },
  { id: 's3', name: 'Project A', icon: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDUNH3xTAsE47vgyqeUpsbNSaOC5Cpq_Jc1X6ik-pduDvNygrMZhb23a1NYCasM9HAqQWQQPDudX5AZOObR_YPxixj79luYlEsHfDFVRXKiM9PIvGjRDlVUAZvCRyTS5D8NW_93kjfwVmIxceMwq23DKWHmxh6GMTYRJwAhEWvYVsi6aFodpWUcMwm_9R5E-aiK0m5D4Vm0MPh81fTAdegxnty1OH1Ta3wf_50lM75FDp2OxhJ7ykQ0Uc5d-Q-IVPIaV5UlyYZv084p', active: false },
  { id: 's4', name: 'Art Corner', icon: 'palette', active: false },
  { id: 's5', name: 'Dev Team', icon: 'code', active: false },
];

export const CHANNELS: Channel[] = [
  { id: 'c1', name: 'general', type: 'text', unread: false },
  { id: 'c2', name: 'showcase', type: 'text', unread: true },
];