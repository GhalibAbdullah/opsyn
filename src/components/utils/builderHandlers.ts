export const createDragHandlers = () => {
  const handlePaletteDragStart = (e: React.DragEvent, nodeType: any) => {
    e.dataTransfer.effectAllowed = 'copy';
    e.dataTransfer.setData('application/json', JSON.stringify(nodeType));
  };

  const handleCanvasDrop = (
    e: React.DragEvent,
    canvasRef: React.RefObject<HTMLDivElement>,
    setWorkflowNodes: (updater: (nodes: any[]) => any[]) => void
  ) => {
    e.preventDefault();
    
    try {
      const nodeTypeData = e.dataTransfer.getData('application/json');
      if (!nodeTypeData || !canvasRef.current) return;
      
      const nodeType = JSON.parse(nodeTypeData);
      const rect = canvasRef.current.getBoundingClientRect();
      const x = Math.max(20, e.clientX - rect.left - 100);
      const y = Math.max(20, e.clientY - rect.top - 40);
      
      const newNode = {
        id: `node-${Date.now()}`,
        type: nodeType.type,
        name: nodeType.name,
        x,
        y,
        width: 200,
        height: 80,
        hasError: false,
        collaborators: [],
        config: getDefaultConfig(nodeType.type, nodeType.name)
      };
      
      setWorkflowNodes(prev => [...prev, newNode]);
    } catch (error) {
      console.error('Error dropping node:', error);
    }
  };

  const handleCanvasDragOver = (e: React.DragEvent) => {
    e.preventDefault();
  };

  return {
    handlePaletteDragStart,
    handleCanvasDrop,
    handleCanvasDragOver
  };
};

export const createNodeHandlers = () => {
  let clickTimeout: NodeJS.Timeout | null = null;
  let clickCount = 0;

  const handleNodeMouseDown = (
    e: React.MouseEvent,
    nodeId: string,
    workflowNodes: any[],
    canvasRef: React.RefObject<HTMLDivElement>,
    setSelectedNode: (nodeId: string | null) => void,
    setWorkflowNodes: (updater: (nodes: any[]) => any[]) => void,
    setConfigPanelOpen: (open: boolean) => void,
    setNodeConfig: (config: any) => void
  ) => {
    if (e.button !== 0) return; // Only left click
    
    clickCount++;
    
    if (clickTimeout) {
      clearTimeout(clickTimeout);
    }
    
    const node = workflowNodes.find(n => n.id === nodeId);
    if (!node || !canvasRef.current) return;
    
    // Double click - open configuration
    if (clickCount === 2) {
      clickCount = 0;
      setSelectedNode(nodeId);
      setConfigPanelOpen(true);
      setNodeConfig(node.config || getDefaultConfig(node.type, node.name));
      return;
    }
    
    // Single click - start drag after delay
    clickTimeout = setTimeout(() => {
      clickCount = 0;
      
      const rect = canvasRef.current?.getBoundingClientRect();
      if (!rect) return;
      
      const dragOffset = {
        x: e.clientX - rect.left - node.x,
        y: e.clientY - rect.top - node.y
      };
      
      const handleMouseMove = (e: MouseEvent) => {
        const rect = canvasRef.current?.getBoundingClientRect();
        if (!rect) return;
        
        const newX = Math.max(0, e.clientX - rect.left - dragOffset.x);
        const newY = Math.max(0, e.clientY - rect.top - dragOffset.y);
        
        setWorkflowNodes(prev => prev.map(n => 
          n.id === nodeId ? { ...n, x: newX, y: newY } : n
        ));
      };
      
      const handleMouseUp = () => {
        document.removeEventListener('mousemove', handleMouseMove);
        document.removeEventListener('mouseup', handleMouseUp);
      };
      
      document.addEventListener('mousemove', handleMouseMove);
      document.addEventListener('mouseup', handleMouseUp);
    }, 200);
  };

  return { handleNodeMouseDown };
};

export const createConnectionHandlers = () => {
  const startConnection = (
    nodeId: string,
    point: any,
    e: React.MouseEvent,
    workflowNodes: any[],
    setIsConnecting: (connecting: boolean) => void,
    setConnectionStart: (start: any) => void
  ) => {
    e.stopPropagation();
    const node = workflowNodes.find(n => n.id === nodeId);
    if (node && point.type === 'output') {
      setIsConnecting(true);
      setConnectionStart({ node, point });
    }
  };

  const completeConnection = (
    nodeId: string,
    point: any,
    e: React.MouseEvent,
    isConnecting: boolean,
    connectionStart: any,
    setConnections: (updater: (connections: any[]) => any[]) => void,
    setIsConnecting: (connecting: boolean) => void,
    setConnectionStart: (start: any) => void
  ) => {
    e.stopPropagation();
    
    if (isConnecting && connectionStart && point.type === 'input' && nodeId !== connectionStart.node.id) {
      const newConnection = {
        id: `conn-${Date.now()}`,
        from: connectionStart.node.id,
        to: nodeId,
        fromPoint: connectionStart.point.position,
        toPoint: point.position
      };
      
      setConnections(prev => [...prev, newConnection]);
    }
    
    setIsConnecting(false);
    setConnectionStart(null);
  };

  const cancelConnection = (
    setIsConnecting: (connecting: boolean) => void,
    setConnectionStart: (start: any) => void
  ) => {
    setIsConnecting(false);
    setConnectionStart(null);
  };

  return { startConnection, completeConnection, cancelConnection };
};

// Helper function to get default configuration for different node types
const getDefaultConfig = (nodeType: string, nodeName: string) => {
  const baseConfig = {
    name: nodeName,
    description: '',
    timeout: 30,
    retryEnabled: false,
    retryCount: 3
  };

  // Add specific config fields based on node name/type
  if (nodeName.toLowerCase().includes('email') || nodeName.toLowerCase().includes('gmail')) {
    return {
      ...baseConfig,
      apiKey: '',
      senderEmail: '',
      recipientEmail: '',
      subject: '',
      body: '',
      enableHtml: false
    };
  }

  if (nodeName.toLowerCase().includes('slack')) {
    return {
      ...baseConfig,
      webhookUrl: '',
      channel: '#general',
      message: '',
      username: 'OPSYN Bot'
    };
  }

  if (nodeName.toLowerCase().includes('webhook')) {
    return {
      ...baseConfig,
      url: '',
      method: 'POST',
      headers: {},
      body: ''
    };
  }

  if (nodeName.toLowerCase().includes('database') || nodeName.toLowerCase().includes('sql')) {
    return {
      ...baseConfig,
      connectionString: '',
      query: '',
      database: '',
      table: ''
    };
  }

  if (nodeName.toLowerCase().includes('api') || nodeName.toLowerCase().includes('http')) {
    return {
      ...baseConfig,
      url: '',
      method: 'GET',
      headers: {},
      body: '',
      apiKey: ''
    };
  }

  return baseConfig;
};