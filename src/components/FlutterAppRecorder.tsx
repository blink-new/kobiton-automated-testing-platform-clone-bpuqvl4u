import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { Progress } from './ui/progress';
import { Play, Square, Download, Smartphone, Users, MessageCircle, Phone, Video } from 'lucide-react';

interface FlutterElement {
  id: string;
  type: string;
  text?: string;
  semanticsLabel?: string;
  key?: string;
  finder: string;
}

interface RecordedAction {
  id: string;
  timestamp: number;
  action: string;
  element: FlutterElement;
  description: string;
  flow: string;
}

interface TestFlow {
  id: string;
  name: string;
  icon: React.ReactNode;
  description: string;
  actions: RecordedAction[];
  status: 'pending' | 'recording' | 'completed';
  confidence: number;
}

export const FlutterAppRecorder: React.FC = () => {
  const [isRecording, setIsRecording] = useState(false);
  const [recordingTime, setRecordingTime] = useState(0);
  const [currentFlow, setCurrentFlow] = useState<string>('');
  const [testFlows, setTestFlows] = useState<TestFlow[]>([
    {
      id: 'registration',
      name: 'User Registration',
      icon: <Users className="w-4 h-4" />,
      description: 'Complete user signup and profile setup',
      actions: [],
      status: 'pending',
      confidence: 0
    },
    {
      id: 'messaging',
      name: 'Send Messages',
      icon: <MessageCircle className="w-4 h-4" />,
      description: 'Send and receive text messages',
      actions: [],
      status: 'pending',
      confidence: 0
    },
    {
      id: 'group-messaging',
      name: 'Group Messages',
      icon: <Users className="w-4 h-4" />,
      description: 'Create groups and send group messages',
      actions: [],
      status: 'pending',
      confidence: 0
    },
    {
      id: 'voice-call',
      name: '1-to-1 Voice Call',
      icon: <Phone className="w-4 h-4" />,
      description: 'Initiate and manage voice calls',
      actions: [],
      status: 'pending',
      confidence: 0
    },
    {
      id: 'video-call',
      name: '1-to-1 Video Call',
      icon: <Video className="w-4 h-4" />,
      description: 'Start and control video calls',
      actions: [],
      status: 'pending',
      confidence: 0
    },
    {
      id: 'group-call',
      name: 'Group Calls',
      icon: <Video className="w-4 h-4" />,
      description: 'Multi-participant video conferences',
      actions: [],
      status: 'pending',
      confidence: 0
    }
  ]);

  const [recentActions, setRecentActions] = useState<RecordedAction[]>([]);

  const simulateFlutterActions = (flowId: string) => {
    const flowActions: Record<string, RecordedAction[]> = {
      'registration': [
        {
          id: '1',
          timestamp: Date.now(),
          action: 'tap',
          element: {
            id: 'signup_button',
            type: 'ElevatedButton',
            text: 'Sign Up',
            key: 'Key(\'signup_btn\')',
            finder: 'find.byKey(Key(\'signup_btn\'))'
          },
          description: 'Tap Sign Up button',
          flow: 'registration'
        },
        {
          id: '2',
          timestamp: Date.now() + 1000,
          action: 'enterText',
          element: {
            id: 'email_field',
            type: 'TextFormField',
            semanticsLabel: 'Email Address',
            finder: 'find.bySemanticsLabel(\'Email Address\')'
          },
          description: 'Enter email address',
          flow: 'registration'
        },
        {
          id: '3',
          timestamp: Date.now() + 2000,
          action: 'enterText',
          element: {
            id: 'password_field',
            type: 'TextFormField',
            semanticsLabel: 'Password',
            finder: 'find.bySemanticsLabel(\'Password\')'
          },
          description: 'Enter password',
          flow: 'registration'
        },
        {
          id: '4',
          timestamp: Date.now() + 3000,
          action: 'tap',
          element: {
            id: 'create_account_btn',
            type: 'ElevatedButton',
            text: 'Create Account',
            finder: 'find.text(\'Create Account\')'
          },
          description: 'Tap Create Account button',
          flow: 'registration'
        }
      ],
      'messaging': [
        {
          id: '5',
          timestamp: Date.now(),
          action: 'tap',
          element: {
            id: 'chat_tab',
            type: 'Tab',
            text: 'Chat',
            finder: 'find.text(\'Chat\')'
          },
          description: 'Navigate to Chat tab',
          flow: 'messaging'
        },
        {
          id: '6',
          timestamp: Date.now() + 1000,
          action: 'tap',
          element: {
            id: 'new_chat_fab',
            type: 'FloatingActionButton',
            semanticsLabel: 'New Chat',
            finder: 'find.bySemanticsLabel(\'New Chat\')'
          },
          description: 'Tap new chat button',
          flow: 'messaging'
        },
        {
          id: '7',
          timestamp: Date.now() + 2000,
          action: 'tap',
          element: {
            id: 'contact_item',
            type: 'ListTile',
            text: 'John Doe',
            finder: 'find.text(\'John Doe\')'
          },
          description: 'Select contact',
          flow: 'messaging'
        },
        {
          id: '8',
          timestamp: Date.now() + 3000,
          action: 'enterText',
          element: {
            id: 'message_input',
            type: 'TextField',
            semanticsLabel: 'Type a message',
            finder: 'find.bySemanticsLabel(\'Type a message\')'
          },
          description: 'Type message',
          flow: 'messaging'
        },
        {
          id: '9',
          timestamp: Date.now() + 4000,
          action: 'tap',
          element: {
            id: 'send_button',
            type: 'IconButton',
            semanticsLabel: 'Send',
            finder: 'find.bySemanticsLabel(\'Send\')'
          },
          description: 'Send message',
          flow: 'messaging'
        }
      ],
      'group-messaging': [
        {
          id: '10',
          timestamp: Date.now(),
          action: 'tap',
          element: {
            id: 'teams_tab',
            type: 'Tab',
            text: 'Teams',
            finder: 'find.text(\'Teams\')'
          },
          description: 'Navigate to Teams tab',
          flow: 'group-messaging'
        },
        {
          id: '11',
          timestamp: Date.now() + 1000,
          action: 'tap',
          element: {
            id: 'create_team_btn',
            type: 'ElevatedButton',
            text: 'Create Team',
            finder: 'find.text(\'Create Team\')'
          },
          description: 'Create new team',
          flow: 'group-messaging'
        },
        {
          id: '12',
          timestamp: Date.now() + 2000,
          action: 'enterText',
          element: {
            id: 'team_name_field',
            type: 'TextFormField',
            semanticsLabel: 'Team Name',
            finder: 'find.bySemanticsLabel(\'Team Name\')'
          },
          description: 'Enter team name',
          flow: 'group-messaging'
        },
        {
          id: '13',
          timestamp: Date.now() + 3000,
          action: 'tap',
          element: {
            id: 'add_members_btn',
            type: 'TextButton',
            text: 'Add Members',
            finder: 'find.text(\'Add Members\')'
          },
          description: 'Add team members',
          flow: 'group-messaging'
        }
      ],
      'voice-call': [
        {
          id: '14',
          timestamp: Date.now(),
          action: 'tap',
          element: {
            id: 'calls_tab',
            type: 'Tab',
            text: 'Calls',
            finder: 'find.text(\'Calls\')'
          },
          description: 'Navigate to Calls tab',
          flow: 'voice-call'
        },
        {
          id: '15',
          timestamp: Date.now() + 1000,
          action: 'tap',
          element: {
            id: 'make_call_btn',
            type: 'FloatingActionButton',
            semanticsLabel: 'Make Call',
            finder: 'find.bySemanticsLabel(\'Make Call\')'
          },
          description: 'Initiate call',
          flow: 'voice-call'
        },
        {
          id: '16',
          timestamp: Date.now() + 2000,
          action: 'tap',
          element: {
            id: 'contact_search',
            type: 'TextField',
            semanticsLabel: 'Search contacts',
            finder: 'find.bySemanticsLabel(\'Search contacts\')'
          },
          description: 'Search for contact',
          flow: 'voice-call'
        },
        {
          id: '17',
          timestamp: Date.now() + 3000,
          action: 'tap',
          element: {
            id: 'voice_call_btn',
            type: 'IconButton',
            semanticsLabel: 'Voice Call',
            finder: 'find.bySemanticsLabel(\'Voice Call\')'
          },
          description: 'Start voice call',
          flow: 'voice-call'
        }
      ],
      'video-call': [
        {
          id: '18',
          timestamp: Date.now(),
          action: 'tap',
          element: {
            id: 'video_call_btn',
            type: 'IconButton',
            semanticsLabel: 'Video Call',
            finder: 'find.bySemanticsLabel(\'Video Call\')'
          },
          description: 'Start video call',
          flow: 'video-call'
        },
        {
          id: '19',
          timestamp: Date.now() + 1000,
          action: 'tap',
          element: {
            id: 'camera_toggle',
            type: 'IconButton',
            semanticsLabel: 'Toggle Camera',
            finder: 'find.bySemanticsLabel(\'Toggle Camera\')'
          },
          description: 'Toggle camera on/off',
          flow: 'video-call'
        },
        {
          id: '20',
          timestamp: Date.now() + 2000,
          action: 'tap',
          element: {
            id: 'mute_toggle',
            type: 'IconButton',
            semanticsLabel: 'Toggle Mute',
            finder: 'find.bySemanticsLabel(\'Toggle Mute\')'
          },
          description: 'Toggle microphone',
          flow: 'video-call'
        }
      ],
      'group-call': [
        {
          id: '21',
          timestamp: Date.now(),
          action: 'tap',
          element: {
            id: 'team_channel',
            type: 'ListTile',
            text: 'General',
            finder: 'find.text(\'General\')'
          },
          description: 'Select team channel',
          flow: 'group-call'
        },
        {
          id: '22',
          timestamp: Date.now() + 1000,
          action: 'tap',
          element: {
            id: 'meet_now_btn',
            type: 'ElevatedButton',
            text: 'Meet now',
            finder: 'find.text(\'Meet now\')'
          },
          description: 'Start group meeting',
          flow: 'group-call'
        },
        {
          id: '23',
          timestamp: Date.now() + 2000,
          action: 'tap',
          element: {
            id: 'invite_people_btn',
            type: 'TextButton',
            text: 'Invite people',
            finder: 'find.text(\'Invite people\')'
          },
          description: 'Invite participants',
          flow: 'group-call'
        }
      ]
    };

    const actions = flowActions[flowId] || [];
    
    // Simulate adding actions over time
    actions.forEach((action, index) => {
      setTimeout(() => {
        setRecentActions(prev => [action, ...prev.slice(0, 9)]);
        
        // Update the flow with actions
        setTestFlows(prev => prev.map(flow => 
          flow.id === flowId 
            ? { ...flow, actions: [...flow.actions, action] }
            : flow
        ));
      }, index * 1500);
    });
  };

  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (isRecording) {
      interval = setInterval(() => {
        setRecordingTime(prev => prev + 1);
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [isRecording]);

  const startRecording = (flowId: string) => {
    setCurrentFlow(flowId);
    setIsRecording(true);
    setRecordingTime(0);
    
    // Update flow status
    setTestFlows(prev => prev.map(flow => 
      flow.id === flowId 
        ? { ...flow, status: 'recording' as const }
        : flow
    ));

    // Simulate recording actions for the specific flow
    simulateFlutterActions(flowId);
  };

  const stopRecording = () => {
    setIsRecording(false);
    
    // Mark current flow as completed
    setTestFlows(prev => prev.map(flow => 
      flow.id === currentFlow 
        ? { ...flow, status: 'completed' as const, confidence: Math.floor(Math.random() * 20) + 80 }
        : flow
    ));
    
    setCurrentFlow('');
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed': return 'bg-green-100 text-green-800';
      case 'recording': return 'bg-blue-100 text-blue-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="space-y-6">
      {/* Flutter App Simulator */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Smartphone className="w-5 h-5" />
            Microsoft Teams Flutter App Simulator
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex gap-6">
            {/* Device Frame */}
            <div className="relative">
              <div className="w-64 h-96 bg-gray-900 rounded-3xl p-4 shadow-2xl">
                <div className="w-full h-full bg-white rounded-2xl overflow-hidden relative">
                  {/* Status Bar */}
                  <div className="h-6 bg-gray-100 flex items-center justify-between px-4 text-xs">
                    <span>9:41</span>
                    <span>100%</span>
                  </div>
                  
                  {/* App Content */}
                  <div className="p-4 h-full">
                    <div className="text-center">
                      <div className="w-16 h-16 bg-blue-600 rounded-lg mx-auto mb-4 flex items-center justify-center">
                        <Users className="w-8 h-8 text-white" />
                      </div>
                      <h3 className="font-semibold text-gray-800">Microsoft Teams</h3>
                      <p className="text-sm text-gray-600 mt-2">Flutter Application</p>
                      
                      {isRecording && (
                        <div className="mt-4">
                          <div className="w-3 h-3 bg-red-500 rounded-full mx-auto animate-pulse"></div>
                          <p className="text-xs text-red-600 mt-1">Recording...</p>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Recording Controls */}
            <div className="flex-1 space-y-4">
              <div className="flex items-center gap-4">
                {!isRecording ? (
                  <div className="text-sm text-gray-600">
                    Select a test flow to start recording
                  </div>
                ) : (
                  <div className="flex items-center gap-4">
                    <Badge variant="destructive" className="animate-pulse">
                      Recording {testFlows.find(f => f.id === currentFlow)?.name}
                    </Badge>
                    <span className="text-lg font-mono">{formatTime(recordingTime)}</span>
                    <Button onClick={stopRecording} variant="outline" size="sm">
                      <Square className="w-4 h-4 mr-2" />
                      Stop
                    </Button>
                  </div>
                )}
              </div>

              {/* Recent Actions */}
              {recentActions.length > 0 && (
                <div className="bg-gray-50 rounded-lg p-4">
                  <h4 className="font-medium mb-3">Recent Actions</h4>
                  <div className="space-y-2 max-h-32 overflow-y-auto">
                    {recentActions.slice(0, 5).map((action) => (
                      <div key={action.id} className="text-sm flex items-center gap-2">
                        <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                        <span className="font-medium">{action.action}</span>
                        <span className="text-gray-600">{action.description}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Test Flows */}
      <Card>
        <CardHeader>
          <CardTitle>Microsoft Teams Test Flows</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {testFlows.map((flow) => (
              <Card key={flow.id} className="relative">
                <CardContent className="p-4">
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex items-center gap-2">
                      {flow.icon}
                      <h4 className="font-medium">{flow.name}</h4>
                    </div>
                    <Badge className={getStatusColor(flow.status)}>
                      {flow.status}
                    </Badge>
                  </div>
                  
                  <p className="text-sm text-gray-600 mb-4">{flow.description}</p>
                  
                  {flow.status === 'completed' && (
                    <div className="mb-4">
                      <div className="flex justify-between text-sm mb-1">
                        <span>Confidence</span>
                        <span>{flow.confidence}%</span>
                      </div>
                      <Progress value={flow.confidence} className="h-2" />
                    </div>
                  )}
                  
                  <div className="flex gap-2">
                    {flow.status === 'pending' && (
                      <Button 
                        onClick={() => startRecording(flow.id)}
                        disabled={isRecording}
                        size="sm"
                        className="flex-1"
                      >
                        <Play className="w-4 h-4 mr-2" />
                        Record
                      </Button>
                    )}
                    
                    {flow.status === 'completed' && (
                      <Button 
                        variant="outline" 
                        size="sm"
                        className="flex-1"
                      >
                        <Download className="w-4 h-4 mr-2" />
                        Export
                      </Button>
                    )}
                  </div>
                  
                  {flow.actions.length > 0 && (
                    <div className="mt-3 text-xs text-gray-500">
                      {flow.actions.length} actions recorded
                    </div>
                  )}
                </CardContent>
              </Card>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};