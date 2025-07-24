import React, { useState, useEffect, useRef } from 'react'
import { Button } from './ui/button'
import { Card, CardContent, CardHeader, CardTitle } from './ui/card'
import { Badge } from './ui/badge'
import { Input } from './ui/input'
import { Label } from './ui/label'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select'
import { Separator } from './ui/separator'
import { Alert, AlertDescription } from './ui/alert'
import { 
  Smartphone, 
  Wifi, 
  WifiOff, 
  RefreshCw, 
  Settings, 
  Monitor,
  Usb,
  QrCode,
  CheckCircle,
  AlertCircle,
  Play,
  Square
} from 'lucide-react'

interface DeviceInfo {
  id: string
  name: string
  platform: 'iOS' | 'Android'
  version: string
  status: 'connected' | 'disconnected' | 'connecting'
  connectionType: 'USB' | 'WiFi' | 'Cloud'
  resolution: string
  battery?: number
}

interface DeviceConnectionProps {
  onDeviceConnected: (device: DeviceInfo) => void
  onScreenMirror: (enabled: boolean) => void
  isRecording: boolean
}

export const DeviceConnection: React.FC<DeviceConnectionProps> = ({
  onDeviceConnected,
  onScreenMirror,
  isRecording
}) => {
  const [devices, setDevices] = useState<DeviceInfo[]>([
    {
      id: 'device_1',
      name: 'iPhone 14 Pro',
      platform: 'iOS',
      version: '17.2',
      status: 'disconnected',
      connectionType: 'WiFi',
      resolution: '1179x2556',
      battery: 85
    },
    {
      id: 'device_2',
      name: 'Samsung Galaxy S23',
      platform: 'Android',
      version: '14.0',
      status: 'disconnected',
      connectionType: 'USB',
      resolution: '1080x2340',
      battery: 72
    }
  ])
  
  const [selectedDevice, setSelectedDevice] = useState<DeviceInfo | null>(null)
  const [connectionMethod, setConnectionMethod] = useState<'usb' | 'wifi' | 'qr'>('wifi')
  const [wifiIP, setWifiIP] = useState('192.168.1.100')
  const [isScanning, setIsScanning] = useState(false)
  const [isMirroring, setIsMirroring] = useState(false)
  const [connectionStatus, setConnectionStatus] = useState<'idle' | 'connecting' | 'connected' | 'error'>('idle')
  const videoRef = useRef<HTMLVideoElement>(null)

  // Simulate device scanning
  const scanForDevices = async () => {
    setIsScanning(true)
    setConnectionStatus('connecting')
    
    // Simulate scanning delay
    await new Promise(resolve => setTimeout(resolve, 2000))
    
    // Simulate finding devices
    const newDevices = [
      ...devices,
      {
        id: 'device_3',
        name: 'iPad Air',
        platform: 'iOS' as const,
        version: '17.1',
        status: 'disconnected' as const,
        connectionType: 'WiFi' as const,
        resolution: '1640x2360',
        battery: 91
      }
    ]
    
    setDevices(newDevices)
    setIsScanning(false)
    setConnectionStatus('idle')
  }

  // Connect to selected device
  const connectToDevice = async (device: DeviceInfo) => {
    setConnectionStatus('connecting')
    setSelectedDevice(device)
    
    // Simulate connection process
    await new Promise(resolve => setTimeout(resolve, 3000))
    
    // Update device status
    const updatedDevices = devices.map(d => 
      d.id === device.id 
        ? { ...d, status: 'connected' as const }
        : { ...d, status: 'disconnected' as const }
    )
    
    setDevices(updatedDevices)
    setConnectionStatus('connected')
    onDeviceConnected({ ...device, status: 'connected' })
  }

  // Start screen mirroring
  const startScreenMirror = async () => {
    if (!selectedDevice) return
    
    setIsMirroring(true)
    onScreenMirror(true)
    
    // Simulate getting device screen stream
    try {
      // In a real implementation, this would connect to the device's screen
      // For demo purposes, we'll simulate a video stream
      if (videoRef.current) {
        // This would be replaced with actual device screen capture
        videoRef.current.src = 'data:video/mp4;base64,AAAAIGZ0eXBpc29tAAACAGlzb21pc28yYXZjMW1wNDE='
      }
    } catch (error) {
      console.error('Failed to start screen mirroring:', error)
      setIsMirroring(false)
      onScreenMirror(false)
    }
  }

  // Stop screen mirroring
  const stopScreenMirror = () => {
    setIsMirroring(false)
    onScreenMirror(false)
    if (videoRef.current) {
      videoRef.current.src = ''
    }
  }

  // Disconnect device
  const disconnectDevice = () => {
    if (selectedDevice) {
      const updatedDevices = devices.map(d => 
        d.id === selectedDevice.id 
          ? { ...d, status: 'disconnected' as const }
          : d
      )
      setDevices(updatedDevices)
      setSelectedDevice(null)
      setConnectionStatus('idle')
      stopScreenMirror()
    }
  }

  return (
    <div className="space-y-6">
      {/* Connection Methods */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Smartphone className="h-5 w-5" />
            Device Connection
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {/* Connection Method Selection */}
          <div className="space-y-2">
            <Label>Connection Method</Label>
            <Select value={connectionMethod} onValueChange={(value: 'usb' | 'wifi' | 'qr') => setConnectionMethod(value)}>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="usb">
                  <div className="flex items-center gap-2">
                    <Usb className="h-4 w-4" />
                    USB Connection
                  </div>
                </SelectItem>
                <SelectItem value="wifi">
                  <div className="flex items-center gap-2">
                    <Wifi className="h-4 w-4" />
                    WiFi Connection
                  </div>
                </SelectItem>
                <SelectItem value="qr">
                  <div className="flex items-center gap-2">
                    <QrCode className="h-4 w-4" />
                    QR Code Pairing
                  </div>
                </SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* WiFi IP Input */}
          {connectionMethod === 'wifi' && (
            <div className="space-y-2">
              <Label>Device IP Address</Label>
              <Input
                value={wifiIP}
                onChange={(e) => setWifiIP(e.target.value)}
                placeholder="192.168.1.100"
              />
              <p className="text-sm text-muted-foreground">
                Enable ADB over WiFi on your device and enter the IP address
              </p>
            </div>
          )}

          {/* QR Code Instructions */}
          {connectionMethod === 'qr' && (
            <Alert>
              <QrCode className="h-4 w-4" />
              <AlertDescription>
                1. Install the Appium Inspector app on your mobile device<br/>
                2. Scan the QR code that will appear after clicking "Scan for Devices"<br/>
                3. Allow screen recording permissions when prompted
              </AlertDescription>
            </Alert>
          )}

          {/* Scan Button */}
          <Button 
            onClick={scanForDevices} 
            disabled={isScanning || connectionStatus === 'connecting'}
            className="w-full"
          >
            {isScanning ? (
              <>
                <RefreshCw className="h-4 w-4 mr-2 animate-spin" />
                Scanning for Devices...
              </>
            ) : (
              <>
                <RefreshCw className="h-4 w-4 mr-2" />
                Scan for Devices
              </>
            )}
          </Button>
        </CardContent>
      </Card>

      {/* Available Devices */}
      <Card>
        <CardHeader>
          <CardTitle>Available Devices</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {devices.map((device) => (
              <div key={device.id} className="flex items-center justify-between p-3 border rounded-lg">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-primary/10 rounded-lg">
                    <Smartphone className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <div className="font-medium">{device.name}</div>
                    <div className="text-sm text-muted-foreground">
                      {device.platform} {device.version} • {device.resolution}
                    </div>
                    <div className="flex items-center gap-2 mt-1">
                      <Badge variant={device.status === 'connected' ? 'default' : 'secondary'}>
                        {device.status}
                      </Badge>
                      <Badge variant="outline">{device.connectionType}</Badge>
                      {device.battery && (
                        <span className="text-xs text-muted-foreground">
                          Battery: {device.battery}%
                        </span>
                      )}
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  {device.status === 'connected' ? (
                    <Button variant="outline" size="sm" onClick={disconnectDevice}>
                      Disconnect
                    </Button>
                  ) : (
                    <Button 
                      size="sm" 
                      onClick={() => connectToDevice(device)}
                      disabled={connectionStatus === 'connecting'}
                    >
                      {connectionStatus === 'connecting' && selectedDevice?.id === device.id ? (
                        <>
                          <RefreshCw className="h-4 w-4 mr-2 animate-spin" />
                          Connecting...
                        </>
                      ) : (
                        'Connect'
                      )}
                    </Button>
                  )}
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Connected Device Controls */}
      {selectedDevice && connectionStatus === 'connected' && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <CheckCircle className="h-5 w-5 text-green-500" />
              Connected: {selectedDevice.name}
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {/* Screen Mirroring Controls */}
            <div className="flex items-center justify-between">
              <div>
                <div className="font-medium">Screen Mirroring</div>
                <div className="text-sm text-muted-foreground">
                  Mirror your device screen in real-time
                </div>
              </div>
              <Button
                variant={isMirroring ? "destructive" : "default"}
                onClick={isMirroring ? stopScreenMirror : startScreenMirror}
                disabled={isRecording}
              >
                {isMirroring ? (
                  <>
                    <Square className="h-4 w-4 mr-2" />
                    Stop Mirror
                  </>
                ) : (
                  <>
                    <Monitor className="h-4 w-4 mr-2" />
                    Start Mirror
                  </>
                )}
              </Button>
            </div>

            <Separator />

            {/* Device Info */}
            <div className="grid grid-cols-2 gap-4 text-sm">
              <div>
                <span className="text-muted-foreground">Platform:</span>
                <span className="ml-2 font-medium">{selectedDevice.platform}</span>
              </div>
              <div>
                <span className="text-muted-foreground">Version:</span>
                <span className="ml-2 font-medium">{selectedDevice.version}</span>
              </div>
              <div>
                <span className="text-muted-foreground">Resolution:</span>
                <span className="ml-2 font-medium">{selectedDevice.resolution}</span>
              </div>
              <div>
                <span className="text-muted-foreground">Connection:</span>
                <span className="ml-2 font-medium">{selectedDevice.connectionType}</span>
              </div>
            </div>

            {/* Recording Status */}
            {isRecording && (
              <Alert>
                <Play className="h-4 w-4" />
                <AlertDescription>
                  Recording in progress. All device interactions are being captured for script generation.
                </AlertDescription>
              </Alert>
            )}
          </CardContent>
        </Card>
      )}

      {/* Connection Status */}
      {connectionStatus === 'error' && (
        <Alert variant="destructive">
          <AlertCircle className="h-4 w-4" />
          <AlertDescription>
            Failed to connect to device. Please check your connection settings and try again.
          </AlertDescription>
        </Alert>
      )}

      {/* Hidden video element for screen mirroring */}
      <video
        ref={videoRef}
        style={{ display: 'none' }}
        autoPlay
        muted
        playsInline
      />
    </div>
  )
}